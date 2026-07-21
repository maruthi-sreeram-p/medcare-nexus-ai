import React from 'react';
import { Box, Typography, Chip, Grid, Divider } from '@mui/material';
import { GlassCard } from './GlassCard';
import { AdminExecutiveAiResponse } from '../api/aiApi';

interface AdminAiExecutiveSummaryProps {
  summary: AdminExecutiveAiResponse | null;
  loading?: boolean;
}

export const AdminAiExecutiveSummary: React.FC<AdminAiExecutiveSummaryProps> = ({ summary, loading }) => {
  if (loading) {
    return (
      <GlassCard sx={{ mb: 4, py: 3.5, background: '#15171C' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#6E8BFF' }}>
            Consolidating Executive Overview...
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#8E8E93' }}>
          Aggregating multi-role clinical activity, inventory depletion rates, and safety protocol metrics.
        </Typography>
      </GlassCard>
    );
  }

  if (!summary) return null;

  return (
    <GlassCard sx={{ mb: 4, background: '#15171C' }}>
      {/* Header Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 1.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.02em' }}>
          Executive Operations Briefing
        </Typography>

        <Chip
          label={summary.systemHealthStatus || 'System Health: Optimal'}
          sx={{
            background: 'rgba(59, 170, 116, 0.1)',
            border: '1px solid rgba(59, 170, 116, 0.25)',
            color: '#3BAA74',
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        />
      </Box>

      {/* Main Operational Briefing Banner */}
      <Box sx={{ p: 2.5, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', mb: 3 }}>
        <Typography variant="caption" sx={{ color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', mb: 0.5 }}>
          Operational Summary
        </Typography>
        <Typography variant="body1" sx={{ color: '#F5F5F7', fontWeight: 500, lineHeight: 1.6 }}>
          {summary.executiveSummary}
        </Typography>
      </Box>

      {/* 4-Grid Breakdown — All Using Identical #15171C Surface Styling */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        {/* Hospital Activity Overview */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2.2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#6E8BFF', fontWeight: 600, textTransform: 'uppercase', display: 'block', mb: 1 }}>
              Clinical Activity Overview
            </Typography>
            <Typography variant="body2" sx={{ color: '#F5F5F7', lineHeight: 1.5 }}>
              {summary.hospitalActivityOverview}
            </Typography>
          </Box>
        </Grid>

        {/* Medicine Usage Trends */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2.2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#8E8E93', fontWeight: 600, textTransform: 'uppercase', display: 'block', mb: 1 }}>
              Pharmacological Usage Trends
            </Typography>
            <Typography variant="body2" sx={{ color: '#F5F5F7', lineHeight: 1.5 }}>
              {summary.usageTrends}
            </Typography>
          </Box>
        </Grid>

        {/* Patient Adherence Watchlist */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2.2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#D99B36', fontWeight: 600, textTransform: 'uppercase', display: 'block', mb: 1 }}>
              Adherence Risk Watchlist
            </Typography>
            {summary.patientAdherenceWatchlist?.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ color: '#F5F5F7', mb: 0.8, lineHeight: 1.5 }}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Low Inventory Risk Alerts */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2.2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#E55353', fontWeight: 600, textTransform: 'uppercase', display: 'block', mb: 1 }}>
              Inventory Risk Alerts
            </Typography>
            {summary.inventoryAlerts?.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ color: '#F5F5F7', mb: 0.8, lineHeight: 1.5 }}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.06)' }} />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" sx={{ color: '#8E8E93' }}>
          Operations Briefing
        </Typography>
        <Typography variant="caption" sx={{ color: '#6E8BFF', fontWeight: 500 }}>
          Executive View Active
        </Typography>
      </Box>
    </GlassCard>
  );
};
