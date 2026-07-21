import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, MenuItem } from '@mui/material';
import { GlassCard } from '../../components/GlassCard';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import { authApi } from '../../api/authApi';
import { useNavigate, Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'PATIENT',
    phone: '',
    specialization: '',
    bloodGroup: 'O+',
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authApi.register(formData);
      dispatch(setCredentials({ token: res.token, user: res }));
      enqueueSnackbar(`Account registered successfully! Welcome, ${res.fullName}.`, { variant: 'success' });
      navigate('/dashboard');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Registration failed.';
      enqueueSnackbar(msg, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 6 }}>
      <Container maxWidth="sm">
        <GlassCard>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#f8fafc', mb: 1 }}>
              Join Medicare Nexus AI
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Create your account to start tracking prescriptions & medication schedules
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              select
              label="User Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <MenuItem value="PATIENT">Patient</MenuItem>
              <MenuItem value="DOCTOR">Doctor</MenuItem>
              <MenuItem value="STAFF">Pharmacy Staff</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                fontSize: '1rem',
                fontWeight: 700,
              }}
            >
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </Button>
          </form>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Already registered?{' '}
              <Link to="/login" style={{ color: '#06b6d4', textDecoration: 'none', fontWeight: 600 }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </GlassCard>
      </Container>
    </Box>
  );
};
