import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client';

// 初始化 Sanity 客户端


// 获取所有消息
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get('status');
    
    let query = '*[_type == "message"]';
    if (status) {
      query = `*[_type == "message" && status == "${status}"]`;
    }
    
    const messages = await client.fetch(query);
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error('获取消息失败:', error);
    return NextResponse.json({ error: '获取消息失败' }, { status: 500 });
  }
}

// 创建新消息
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: '姓名、邮箱和消息内容为必填项' }, { status: 400 });
    }
    
    const newMessage = await client.create({
      _type: 'message',
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      status: 'unread'
    });
    
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('创建消息失败:', error);
    return NextResponse.json({ error: '创建消息失败' }, { status: 500 });
  }
}

// 更新消息
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { _id, ...updates } = body;
    
    if (!_id) {
      return NextResponse.json({ error: '缺少消息ID' }, { status: 400 });
    }
    
    const updatedMessage = await client.patch(_id)
      .set(updates)
      .commit();
    
    return NextResponse.json(updatedMessage, { status: 200 });
  } catch (error) {
    console.error('更新消息失败:', error);
    return NextResponse.json({ error: '更新消息失败' }, { status: 500 });
  }
}

// 删除消息
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: '缺少消息ID' }, { status: 400 });
    }
    
    await client.delete(id);
    return NextResponse.json({ success: true, message: '消息已删除' }, { status: 200 });
  } catch (error) {
    console.error('删除消息失败:', error);
    return NextResponse.json({ error: '删除消息失败' }, { status: 500 });
  }
}
