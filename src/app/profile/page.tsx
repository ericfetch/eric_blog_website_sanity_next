'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader,
  Typography,
  Tabs,
  Tab,
  Box,
  TextField,
  Avatar,
  Grid,
  Divider,
  Paper,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/imageUrl';
import PostBody from '@/components/PostBody';
import Head from '@/components/Head';
import Footer from '@/components/Footer';

const profileFormSchema = z.object({
  username: z.string().min(3, '用户名至少需要3个字符').max(20, '用户名最多20个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  nickname: z.string().optional(),
  title: z.string().optional(),
  personalIntro: z.string().optional(),
  socialAccounts: z.object({
    github: z.string().url('请输入有效的URL地址').optional().or(z.literal('')),
    linkedin: z.string().url('请输入有效的URL地址').optional().or(z.literal('')),
    twitter: z.string().url('请输入有效的URL地址').optional().or(z.literal('')),
  }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({
    open: false, 
    message: '', 
    severity: 'success'
  });
  
  const router = useRouter();
  
  // 获取用户数据
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // 使用我们的API端点获取用户数据
        const response = await fetch('/api/auth/me');
        
        if (!response.ok) {
          throw new Error('获取用户数据失败');
        }
        
        const data = await response.json();
        
        if (data.user) {
          setUser(data.user);
          reset({
            username: data.user.username,
            email: data.user.email,
            nickname: data.user.nickname || '',
            title: data.user.title || '',
            personalIntro: data.user.personalIntro || '',
            socialAccounts: {
              github: data.user.socialAccounts?.github || '',
              linkedin: data.user.socialAccounts?.linkedin || '',
              twitter: data.user.socialAccounts?.twitter || '',
            },
          });
        }
      } catch (error) {
        console.error('获取用户数据失败', error);
        setSnackbar({
          open: true,
          message: "无法获取用户信息，请稍后再试",
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  const { control, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      email: '',
      nickname: '',
      title: '',
      personalIntro: '',
      socialAccounts: {
        github: '',
        linkedin: '',
        twitter: '',
      },
    },
  });
  
  async function onSubmit(data: ProfileFormValues) {
    setUpdateLoading(true);
    try {
      // 处理头像上传
      let avatarUrl = null;
      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        
        const avatarResponse = await fetch('/api/auth/me', {
          method: 'POST',
          body: formData
        });
        
        if (!avatarResponse.ok) {
          throw new Error('头像上传失败');
        }
        
        const avatarData = await avatarResponse.json();
        avatarUrl = avatarData.avatar.url;
      }
      
      // 更新用户资料
      const response = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('更新用户资料失败');
      }
      
      setSnackbar({
        open: true,
        message: "您的个人资料已成功更新",
        severity: 'success'
      });
      
      // 重新获取用户信息以更新页面
      const updatedUserResponse = await fetch('/api/auth/me');
      const updatedUserData = await updatedUserResponse.json();
      if (updatedUserData.user) {
        setUser(updatedUserData.user);
      }
      
    } catch (error) {
      console.error('更新用户资料失败', error);
      setSnackbar({
        open: true,
        message: "无法更新个人资料，请稍后再试",
        severity: 'error'
      });
    } finally {
      setUpdateLoading(false);
    }
  }
  
  // 处理头像上传
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // 创建预览
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setAvatarPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  const getAvatarUrl = () => {
    if (user?.avatar?.asset) {
      return urlFor(user.avatar)
        .width(96)  // 设置宽度
        .height(96) // 设置高度
        .format('webp') // 优化格式
        .url();     // 生成URL
    }
    return null;
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <>
      <Head />
    
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4, px: 2 }}>
      <Card>
        <CardHeader 
          title="个人中心" 
          subheader="管理您的账户信息和偏好设置"
        />
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="用户设置标签页">
              <Tab label="个人资料" />
              <Tab label="账户安全" />
              <Tab label="订阅信息" />
            </Tabs>
          </Box>
          
          <TabPanel value={tabValue} index={0}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* 头像上传 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <Avatar 
                  src={avatarPreview || getAvatarUrl() || ''} 
                  alt={user?.nickname || user?.username}
                  sx={{ width: 96, height: 96, mb: 2 }}
                >
                  {user?.nickname?.[0] || user?.username?.[0] || '用'}
                </Avatar>
                <Button
                  variant="outlined"
                  component="label"
                  size="small"
                >
                  更换头像
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleAvatarChange}
                  />
                </Button>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="用户名"
                        fullWidth
                        error={!!errors.username}
                        helperText={errors.username?.message || "这是您的登录账号名称"}
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="电子邮箱"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Controller
                    name="nickname"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="昵称"
                        fullWidth
                        error={!!errors.nickname}
                        helperText={errors.nickname?.message}
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="头衔/职位"
                        fullWidth
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        margin="normal"
                        placeholder="例：前端开发工程师"
                      />
                    )}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Controller
                    name="personalIntro"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="个人介绍"
                        fullWidth
                        multiline
                        rows={4}
                        error={!!errors.personalIntro}
                        helperText={errors.personalIntro?.message}
                        margin="normal"
                        placeholder="简单介绍一下自己吧"
                      />
                    )}
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 4, mb: 2 }}>
                <Typography variant="h6">社交账号</Typography>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="socialAccounts.github"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="GitHub"
                        fullWidth
                        error={!!errors.socialAccounts?.github}
                        helperText={errors.socialAccounts?.github?.message}
                        margin="normal"
                        placeholder="https://github.com/username"
                      />
                    )}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Controller
                    name="socialAccounts.linkedin"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="LinkedIn"
                        fullWidth
                        error={!!errors.socialAccounts?.linkedin}
                        helperText={errors.socialAccounts?.linkedin?.message}
                        margin="normal"
                        placeholder="https://linkedin.com/in/username"
                      />
                    )}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Controller
                    name="socialAccounts.twitter"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Twitter/X"
                        fullWidth
                        error={!!errors.socialAccounts?.twitter}
                        helperText={errors.socialAccounts?.twitter?.message}
                        margin="normal"
                        placeholder="https://twitter.com/username"
                      />
                    )}
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={updateLoading}
                >
                  {updateLoading ? "更新中..." : "保存更改"}
                </Button>
              </Box>
            </form>
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <Paper elevation={0} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                账户安全
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                修改您的密码和账户安全设置
              </Typography>
              
              <Box component="form" sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      id="current-password"
                      label="当前密码"
                      type="password"
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="new-password"
                      label="新密码"
                      type="password"
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="confirm-password"
                      label="确认新密码"
                      type="password"
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button variant="contained">
                    更新密码
                  </Button>
                </Box>
              </Box>
            </Paper>
          </TabPanel>
          
          <TabPanel value={tabValue} index={2}>
            <Paper elevation={0} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                订阅信息
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                管理您的内容订阅和付费服务
              </Typography>
              
              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box>
                    <Typography variant="subtitle1">我的积分</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.points || 0} 积分
                    </Typography>
                  </Box>
                  <Button variant="outlined" size="small">
                    充值积分
                  </Button>
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="subtitle1" gutterBottom>
                  已订阅分类
                </Typography>
                
                {user?.paymentInfo?.subscribedCategories?.length ? (
                  <Box sx={{ mt: 2 }}>
                    {user.paymentInfo.subscribedCategories.map((sub: any, index: number) => (
                      <Paper 
                        key={index} 
                        variant="outlined" 
                        sx={{ 
                          p: 2, 
                          mb: 2, 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center' 
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2">{sub.category.title.zh}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            <PostBody content={sub.category.marketBody} />
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            到期日: {new Date(sub.expiryDate).toLocaleDateString('zh-CN')}
                          </Typography>
                        </Box>
                        <Button variant="outlined" size="small">
                          续订
                        </Button>
                      </Paper>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    您尚未订阅任何分类内容
                  </Typography>
                )}
                
                <Box sx={{ mt: 4 }}>
                  <Button variant="outlined">
                    浏览订阅选项
                  </Button>
                </Box>
              </Box>
            </Paper>
          </TabPanel>
        </CardContent>
      </Card>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
    <Footer />
    </>
  );
}
