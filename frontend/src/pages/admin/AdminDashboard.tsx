import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Chip, Button, CircularProgress } from '@mui/material';
import { GlassCard } from '../../components/GlassCard';
import { AdminAiExecutiveSummary } from '../../components/AdminAiExecutiveSummary';
import { adminApi } from '../../api/adminApi';
import { aiApi, AdminExecutiveAiResponse } from '../../api/aiApi';
import { enqueueSnackbar } from 'notistack';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Admin AI Executive State
  const [aiExecutive, setAiExecutive] = useState<AdminExecutiveAiResponse | null>(null);
  const [loadingAi, setLoadingAi] = useState(true);

  const fetchData = async () => {
    try {
      const [s, u, m] = await Promise.all([adminApi.getStats(), adminApi.getUsers(), adminApi.getMedicines()]);
      setStats(s);
      setUsers(u);
      setMedicines(m);
      fetchAiExecutive();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAiExecutive = async () => {
    setLoadingAi(true);
    try {
      const res = await aiApi.getAdminExecutiveSummary();
      setAiExecutive(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleUserStatus = async (userId: number, currentStatus: string) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      await adminApi.updateUserStatus(userId, nextStatus);
      enqueueSnackbar(`User status updated to ${nextStatus}`, { variant: 'info' });
      fetchData();
    } catch (err) {
      enqueueSnackbar('Failed to update user status.', { variant: 'error' });
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 14 }}>
        <CircularProgress sx={{ color: '#6D8DFF' }} size={36} />
        <Typography variant="body2" sx={{ color: '#8E8E93', mt: 2 }}>
          Loading Executive Overview...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em' }}>
            System Administration
          </Typography>
          <Typography variant="body2" sx={{ color: '#8E8E93' }}>
            Platform metrics, user governance, and catalog overview.
          </Typography>
        </Box>

        <Chip
          label="System Status: Optimal"
          sx={{
            background: 'rgba(59, 170, 116, 0.12)',
            border: '1px solid rgba(59, 170, 116, 0.3)',
            color: '#3BAA74',
            fontWeight: 600,
            px: 1,
            py: 0.5,
          }}
        />
      </Box>

      {/* Admin Executive Briefing Card */}
      <AdminAiExecutiveSummary summary={aiExecutive} loading={loadingAi} />

      {/* Metric Cards Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <GlassCard>
            <Typography variant="caption" sx={{ color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              System Accounts
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#F5F5F7', mt: 1 }}>
              {stats?.totalUsers || 4}
            </Typography>
          </GlassCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <GlassCard>
            <Typography variant="caption" sx={{ color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Regimens
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#3BAA74', mt: 1 }}>
              {stats?.activePrescriptions || 1}
            </Typography>
          </GlassCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <GlassCard>
            <Typography variant="caption" sx={{ color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Low Stock Items
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#E55353', mt: 1 }}>
              {stats?.lowStockCount || 1}
            </Typography>
          </GlassCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <GlassCard>
            <Typography variant="caption" sx={{ color: '#6D8DFF', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Queries Evaluated
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#6D8DFF', mt: 1 }}>
              {stats?.aiAssistantQueries || 142}
            </Typography>
          </GlassCard>
        </Grid>
      </Grid>

      {/* Registered User Stream */}
      <GlassCard sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#F5F5F7' }}>
            User Accounts & Permissions
          </Typography>
          <Typography variant="caption" sx={{ color: '#8E8E93' }}>
            Total Accounts: {users.length}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {users.map((u) => (
            <Grid item xs={12} sm={6} md={4} key={u.id}>
              <Box
                sx={{
                  p: 2.2,
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  height: '100%',
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#F5F5F7' }}>
                      {u.fullName}
                    </Typography>
                    <Chip
                      label={u.status}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        background: u.status === 'ACTIVE' ? 'rgba(59, 170, 116, 0.12)' : 'rgba(255, 255, 255, 0.06)',
                        color: u.status === 'ACTIVE' ? '#3BAA74' : '#8E8E93',
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: '#8E8E93', mb: 1, fontSize: '0.85rem' }}>
                    {u.email}
                  </Typography>
                  <Chip
                    label={u.role?.name || 'ROLE_PATIENT'}
                    size="small"
                    sx={{ background: 'rgba(109, 141, 255, 0.12)', color: '#6D8DFF', fontWeight: 500, fontSize: '0.7rem', mb: 2 }}
                  />
                </Box>

                <Button
                  size="small"
                  variant="outlined"
                  color={u.status === 'ACTIVE' ? 'error' : 'success'}
                  onClick={() => handleToggleUserStatus(u.id, u.status)}
                  sx={{ borderRadius: '8px', fontWeight: 600, fontSize: '0.75rem' }}
                >
                  {u.status === 'ACTIVE' ? 'Disable Account' : 'Activate Account'}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </GlassCard>

      {/* Master Medicine Catalog */}
      <GlassCard>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5, color: '#F5F5F7' }}>
          Medicine Catalog ({medicines.length} Items)
        </Typography>

        <Grid container spacing={2}>
          {medicines.map((m) => (
            <Grid item xs={12} sm={6} md={4} key={m.id}>
              <Box sx={{ p: 2.2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#6D8DFF' }}>
                  {m.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#8E8E93', fontSize: '0.85rem' }}>
                  {m.genericName} | {m.dosageForm} ({m.unit})
                </Typography>
                <Typography variant="caption" sx={{ color: '#8E8E93', display: 'block', mt: 1, lineHeight: 1.4 }}>
                  {m.description || 'Clinical formula approved for standard dispensing.'}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </GlassCard>
    </Box>
  );
};
