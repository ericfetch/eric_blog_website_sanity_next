import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client';
import bcrypt from 'bcryptjs';
import { signToken } from '@/sanity/jwt';
import { verifyToken } from '@/sanity/jwt';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    // 检查邮箱是否已存在
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      return NextResponse.json(
        { message: '该邮箱已被注册' },
        { status: 400 }
      );
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const newUser = await client.create({
      _type: 'user',
      username,
      email,
      password: hashedPassword,
      title: 'user', // 默认角色
    });

    // 创建JWT
    const token = signToken({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      title: newUser.title,
    });

    // 返回用户信息和token
    return NextResponse.json({
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        title: newUser.title,
      },
      token,
    });
  } catch (error) {
    console.error('注册错误:', error);
    return NextResponse.json(
      { message: '服务器错误' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // 从cookie获取token
    const token = req.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: '未授权' },
        { status: 401 }
      );
    }
    
    // 验证token
    const payload = verifyToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json(
        { message: '无效的token' },
        { status: 401 }
      );
    }
    
    // 从Sanity获取最新的用户信息
    const user = await client.fetch(
      `*[_type == "user" && _id == $id][0]{
        _id,
        username,
        email,
        title
      }`,
      { id: payload.id }
    );
    
    if (!user) {
      return NextResponse.json(
        { message: '用户不存在' },
        { status: 404 }
      );
    }
    
    // 返回用户信息
    return NextResponse.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        title: user.title,
      },
    });
  } catch (error) {
    console.error('获取用户信息错误:', error);
    return NextResponse.json(
      { message: '服务器错误' },
      { status: 500 }
    );
  }
}
