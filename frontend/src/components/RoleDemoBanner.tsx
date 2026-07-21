import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { authApi } from '../api/authApi';
import { enqueueSnackbar } from 'notistack';

export const RoleDemoBanner: React.FC = () => {
  const dispatch = useDispatch();

  const handleSwitchAccount = async (email: string, roleName: string) => {
    try {
      const res = await authApi.login({ email, password: email.split('@')[0] + '123' });
      dispatch(setCredentials({ token: res.token, user: res }));
      enqueueSnackbar(`Switched active account to ${roleName} (${res.fullName})`, { variant: 'success' });
    } catch (err: any) {
      enqueueSnackbar('Account switch failed.', { variant: 'error' });
    }
  };

  return (
    <Box
      sx={{
        background: '#0B0B0D',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        px: 3,
        py: 0.6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 1.5,
      }}
    >
      <Typography variant="caption" sx={{ color: '#8E8E93', fontWeight: 500, fontSize: '0.75rem' }}>
        Account View
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {[
          { label: 'Physician', email: 'doctor@medicare.com', role: 'Doctor' },
          { label: 'Patient', email: 'patient@medicare.com', role: 'Patient' },
          { label: 'Pharmacy', email: 'staff@medicare.com', role: 'Staff' },
          { label: 'Administrator', email: 'admin@medicare.com', role: 'Admin' },
        ].map((item) => (
          <Button
            key={item.role}
            size="small"
            variant="text"
            onClick={() => handleSwitchAccount(item.email, item.role)}
            sx={{
              color: '#8E8E93',
              fontSize: '0.75rem',
              fontWeight: 500,
              py: 0.1,
              px: 0.8,
              borderRadius: '6px',
              '&:hover': { color: '#F5F5F7', backgroundColor: 'rgba(255, 255, 255, 0.04)' },
            }}
          >
            {item.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
