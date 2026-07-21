import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { GlassCard } from '../../components/GlassCard';
import { RoleDemoBanner } from '../../components/RoleDemoBanner';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import { authApi } from '../../api/authApi';
import { useNavigate, Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      dispatch(setCredentials({ token: res.token, user: res }));
      enqueueSnackbar(`Welcome back, ${res.fullName}`, { variant: 'success' });
      navigate('/dashboard');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Login failed. Invalid credentials.';
      enqueueSnackbar(msg, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword(demoEmail.split('@')[0] + '123');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#0B0B0D',
      }}
    >
      <RoleDemoBanner />

      <Container maxWidth="xs" sx={{ my: 'auto', py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', mb: 1 }}>
            Medicare Nexus
          </Typography>
          <Typography variant="body2" sx={{ color: '#8E8E93', fontSize: '0.9rem' }}>
            Intelligent Medication Copilot
          </Typography>
        </Box>

        <GlassCard sx={{ p: 3.5, background: '#15171C' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@organization.com"
              required
              sx={{ mb: 2.5 }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.4,
                backgroundColor: '#6E8BFF',
                color: '#F5F5F7',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#5873E6',
                },
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>

          {/* Account Role Fill */}
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <Typography variant="caption" sx={{ color: '#8E8E93', fontWeight: 500, display: 'block', mb: 1.5, textAlign: 'center' }}>
              Select Account Role To Autofill
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { role: 'Physician', email: 'doctor@medicare.com' },
                { role: 'Patient', email: 'patient@medicare.com' },
                { role: 'Pharmacy', email: 'staff@medicare.com' },
                { role: 'Administrator', email: 'admin@medicare.com' },
              ].map((c) => (
                <Button
                  key={c.role}
                  size="small"
                  variant="outlined"
                  onClick={() => handleQuickFill(c.email)}
                  sx={{
                    color: '#8E8E93',
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                    fontSize: '0.75rem',
                    textTransform: 'none',
                    py: 0.3,
                    px: 1,
                    '&:hover': { borderColor: '#6E8BFF', color: '#F5F5F7', backgroundColor: 'transparent' },
                  }}
                >
                  {c.role}
                </Button>
              ))}
            </Box>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: '#8E8E93', fontSize: '0.85rem' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#6E8BFF', textDecoration: 'none', fontWeight: 600 }}>
                Register
              </Link>
            </Typography>
          </Box>
        </GlassCard>
      </Container>
    </Box>
  );
};
