import React from 'react';
import { Box, Container, Typography, Button, Avatar, Chip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/authSlice';
import { RoleDemoBanner } from '../components/RoleDemoBanner';
import { useNavigate } from 'react-router-dom';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return <Chip label="Administrator" size="small" sx={{ background: 'rgba(255, 255, 255, 0.05)', color: '#8E8E93', fontWeight: 500, fontSize: '0.7rem' }} />;
      case 'ROLE_DOCTOR':
        return <Chip label="Physician" size="small" sx={{ background: 'rgba(110, 139, 255, 0.1)', color: '#6E8BFF', fontWeight: 500, fontSize: '0.7rem' }} />;
      case 'ROLE_STAFF':
        return <Chip label="Pharmacy" size="small" sx={{ background: 'rgba(255, 255, 255, 0.05)', color: '#8E8E93', fontWeight: 500, fontSize: '0.7rem' }} />;
      default:
        return <Chip label="Patient" size="small" sx={{ background: 'rgba(59, 170, 116, 0.1)', color: '#3BAA74', fontWeight: 500, fontSize: '0.7rem' }} />;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#0B0B0D', color: '#F5F5F7' }}>
      <RoleDemoBanner />

      {/* Production Commercial SaaS Header */}
      <Box
        sx={{
          background: '#0B0B0D',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          py: 1.8,
        }}
      >
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Brand Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', fontSize: '1.1rem' }}>
              Medicare Nexus
            </Typography>
          </Box>

          {/* User Profile & Sign Out */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ width: 30, height: 30, bgcolor: '#6E8BFF', color: '#F5F5F7', fontWeight: 600, fontSize: '0.8rem' }}>
                {user?.fullName?.charAt(0) || 'U'}
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#F5F5F7', lineHeight: 1.2, fontSize: '0.85rem' }}>
                  {user?.fullName}
                </Typography>
                {getRoleBadge(user?.role)}
              </Box>
            </Box>

            <Button
              size="small"
              variant="text"
              onClick={handleLogout}
              sx={{ color: '#8E8E93', fontWeight: 500, fontSize: '0.8rem', '&:hover': { color: '#E55353' } }}
            >
              Sign Out
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Page Content */}
      <Box sx={{ flex: 1, py: 4 }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </Box>
  );
};
