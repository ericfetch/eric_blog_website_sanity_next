'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  CircularProgress,
  Box,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'read' | 'unread';
}

export default function MessageTable() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 获取所有消息
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/message');
      
      if (!response.ok) {
        throw new Error('获取消息失败');
      }
      
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError('获取消息时出错');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 更新消息状态
  const updateMessageStatus = async (id: string, newStatus: 'read' | 'unread') => {
    try {
      const response = await fetch('/api/message', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('更新消息状态失败');
      }

      // 更新本地状态
      setMessages(messages.map(msg => 
        msg._id === id ? { ...msg, status: newStatus } : msg
      ));
    } catch (err) {
      console.error('更新消息状态失败:', err);
      alert('更新消息状态失败');
    }
  };

  // 删除消息
  const deleteMessage = async (id: string) => {
    if (!confirm('确定要删除此消息吗？')) return;
    
    try {
      const response = await fetch(`/api/message?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('删除消息失败');
      }

      // 从列表中移除该消息
      setMessages(messages.filter(msg => msg._id !== id));
    } catch (err) {
      console.error('删除消息失败:', err);
      alert('删除消息失败');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="消息列表">
        <TableHead>
          <TableRow>
            <TableCell>发送人</TableCell>
            <TableCell>邮箱</TableCell>
            <TableCell>内容</TableCell>
            <TableCell>创建时间</TableCell>
            <TableCell>状态</TableCell>
            <TableCell align="right">操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">暂无消息</TableCell>
            </TableRow>
          ) : (
            messages.map((msg) => (
              <TableRow 
                key={msg._id}
                sx={{ 
                  backgroundColor: msg.status === 'unread' ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } 
                }}
              >
                <TableCell>{msg.name}</TableCell>
                <TableCell>{msg.email}</TableCell>
                <TableCell sx={{ maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {msg.message}
                </TableCell>
                <TableCell>
                  {new Date(msg.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={msg.status === 'unread' ? '未读' : '已读'} 
                    color={msg.status === 'unread' ? 'error' : 'success'} 
                    size="small" 
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Tooltip title={msg.status === 'unread' ? '标为已读' : '标为未读'}>
                      <IconButton 
                        size="small"
                        color={msg.status === 'unread' ? 'primary' : 'warning'}
                        onClick={() => updateMessageStatus(msg._id, msg.status === 'unread' ? 'read' : 'unread')}
                      >
                        {msg.status === 'unread' ? <MarkEmailUnreadIcon /> : <CheckCircleIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="删除">
                      <IconButton 
                        size="small"
                        color="error"
                        onClick={() => deleteMessage(msg._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 