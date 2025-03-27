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
    const payload:any = verifyToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json(
        { message: '无效的token' },
        { status: 401 }
      );
    }
    
    // 从Sanity获取最新的用户信息 - 扩展订阅分类查询
    const user = await client.fetch(
      `*[_type == "user" && _id == $id][0]{
        _id,
        username,
        email,
        nickname,
        avatar,
        title,
        role,
        points,
        browsingHistory[]->{
          _id,
          title,
          slug
        },
        personalIntro,
        socialAccounts,
        "paymentInfo": {
          "subscribedCategories": paymentInfo.subscribedCategories[] {
            "category": category->{
              _id,
              title,
              marketBody
            },
            expiryDate
          }
        }
      }`,
      { id: payload.id }
    );
    
    if (!user) {
      return NextResponse.json(
        { message: '用户不存在' },
        { status: 404 }
      );
    }
    
    // 返回完整用户信息（包含分类详情）
    return NextResponse.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        nickname: user.nickname,
        avatar: user.avatar,
        title: user.title,
        role: user.role,
        points: user.points,
        browsingHistory: user.browsingHistory,
        personalIntro: user.personalIntro,
        socialAccounts: user.socialAccounts,
        paymentInfo: user.paymentInfo
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

// 添加用户头像上传处理函数
export async function POST(req: NextRequest) {
  try {
    // 验证用户身份
    const token = req.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: '未授权' },
        { status: 401 }
      );
    }
    
    const payload:any = verifyToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json(
        { message: '无效的token' },
        { status: 401 }
      );
    }
    
    const formData = await req.formData();
    const avatarFile = formData.get('avatar') as File;
    
    if (!avatarFile) {
      return NextResponse.json(
        { message: '未提供头像文件' },
        { status: 400 }
      );
    }
    
    // 检查文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(avatarFile.type)) {
      return NextResponse.json(
        { message: '不支持的文件类型，请上传JPEG、PNG、GIF或WEBP格式图片' },
        { status: 400 }
      );
    }
    
    // 文件大小限制（5MB）
    if (avatarFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: '文件过大，请上传小于5MB的图片' },
        { status: 400 }
      );
    }
    
    // 上传到Sanity的资产库
    const fileBuffer = await avatarFile.arrayBuffer();
    const fileData = Buffer.from(fileBuffer);
    
    const asset = await client.assets.upload('image', fileData, {
      filename: avatarFile.name,
      contentType: avatarFile.type
    });
    
    // 更新用户头像
    await client
      .patch(payload.id)
      .set({
        avatar: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        }
      })
      .commit();
    
    return NextResponse.json({
      message: '头像上传成功',
      avatar: {
        url: asset.url,
        id: asset._id
      }
    });
    
  } catch (error) {
    console.error('头像上传错误:', error);
    return NextResponse.json(
      { message: '服务器错误' },
      { status: 500 }
    );
  }
}

// 添加删除用户账户功能
export async function DELETE(req: NextRequest) {
  try {
    // 验证用户身份
    const token = req.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: '未授权' },
        { status: 401 }
      );
    }
    
    const payload:any = verifyToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json(
        { message: '无效的token' },
        { status: 401 }
      );
    }
    
    // 获取要删除的用户ID
    const { userId } = await req.json();
    
    // 只允许删除自己的账户（没有角色字段，所以简化权限检查）
    if (userId !== payload.id) {
      return NextResponse.json(
        { message: '只能删除自己的账户' },
        { status: 403 }
      );
    }
    
    // 执行删除操作
    await client.delete(userId);
    
    return NextResponse.json({
      message: '用户账户已删除'
    });
    
  } catch (error) {
    console.error('删除用户错误:', error);
    return NextResponse.json(
      { message: '服务器错误' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
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
    const payload:any = verifyToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json(
        { message: '无效的token' },
        { status: 401 }
      );
    }
    
    // 获取请求体
    const body = await req.json();
    
    // 可更新的字段列表（根据用户模型调整）
    const allowedFields = ['username', 'nickname', 'title', 'personalIntro', 'socialAccounts'];
    
    // 过滤只允许更新的字段
    const updates = Object.keys(body)
      .filter(key => allowedFields.includes(key))
      .reduce((obj: any, key: string) => {
        obj[key] = body[key];
        return obj;
      }, {});
    
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { message: '没有提供有效的更新字段' },
        { status: 400 }
      );
    }
    
    // 更新用户信息
    await client
      .patch(payload.id)
      .set(updates)
      .commit();
    
    // 返回成功消息
    return NextResponse.json({
      message: '用户信息更新成功',
      updatedFields: Object.keys(updates)
    });
    
  } catch (error) {
    console.error('更新用户信息错误:', error);
    return NextResponse.json(
      { message: '服务器错误' },
      { status: 500 }
    );
  }
}