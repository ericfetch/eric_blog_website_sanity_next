import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client';
import { verifyToken } from '@/sanity/jwt';

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
        name,
        email,
        role
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
        name: user.name,
        email: user.email,
        role: user.role,
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