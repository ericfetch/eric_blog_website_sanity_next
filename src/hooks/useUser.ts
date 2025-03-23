// src/hooks/useUser.ts
"use client";

import { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  // 其他可能的用户信息
}

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        // 调用API获取用户信息
        const response = await fetch('/api/auth/register', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          // 如果响应不是200，可能是token过期或无效
          if (response.status === 401) {
            // 删除token
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            setUser(null);
            setLoading(false);
            return;
          }
          throw new Error('获取用户信息失败');
        }
        
        const userData = await response.json();
        setUser(userData.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : '未知错误');
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const logout = () => {
    // 删除token
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // 重置状态
    setUser(null);
    // 可以添加页面重定向
    window.location.href = '/';
  };

  return { user, loading, error, logout };
}