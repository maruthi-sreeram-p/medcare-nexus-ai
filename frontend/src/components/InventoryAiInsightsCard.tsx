import React from 'react';
import { Box, Typography, Chip, Grid, Divider } from '@mui/material';
import { GlassCard } from './GlassCard';
import { StaffInventoryAiResponse } from '../api/aiApi';

interface InventoryAiInsightsCardProps {
  insights: StaffInventoryAiResponse | null;
  loading?: boolean;
}

export const InventoryAiInsightsCard: React.FC<InventoryAiInsightsCardProps> = ({ insights, loading }) => {
  if (loading) {
    return (
      <GlassCard sx={{ mb: 4, py: 3.5, background: '#15171C' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#6E8BFF' }}>
            Evaluating Inventory Depletion Velocity...
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#8E8E93' }}>
          Analyzing daily prescription velocity, batch expiry dates, and supply chain lead times.
        </Typography>
      </GlassCard>
    );
  }

  if (!insights) return null;

  return (
    <GlassCard sx={{ mb: 4, background: '#15171C' }}>
      {/* Header Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 1.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.02em' }}>
          Inventory Forecast & Depletion Analytics
        </Typography>

        <Chip
          label={insights.restockingPriority || 'Reorder Priority High'}
          sx={{
            background: 'rgba(229, 83, 83, 0.1)',
            border: '1px solid rgba(229, 83, 83, 0.25)',
            color: '#E55353',
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        />
      </Box>

      {/* Main Stock Summary Banner */}
      <Box sx={{ p: 2.5, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', mb: 3 }}>
        <Typography variant="caption" sx={{ color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', mb: 0.5 }}>
          Supply Overview
        </Typography>
        <Typography variant="body1" sx={{ color: '#F5F5F7', fontWeight: 500, lineHeight: 1.6 }}>
          {insights.executiveStockSummary}
        </Typography>
      </Box>

      {/* 4-Grid Breakdown — All Using Identical #15171C Surface Styling */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        {/* Low Stock & Depletion Predictions */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2.2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#6E8BFF', fontWeight: 600, textTransform: 'uppercase', display: 'block', mb: 1 }}>
              Depletion Velocity Forecast
            </Typography>
            {insights.lowStockPredictions?.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ color: '#F5F5F7', mb: 0.8, lineHeight: 1.5 }}>
                • {item}
              </Typography>
            ))}
            {insights.depletionEstimates?.map((item, idx) => (
              <Typography key={`dep-${idx}`} variant="body2" sx={{ color: '#F5F5F7', lineHeight: 1.5 }}>
                • Depletion Estimate: {item}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Recommended Purchase Quantities */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2.2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#6E8BFF', fontWeight: 600, textTransform: 'uppercase', display: 'block', mb: 1 }}>
              Purchasing Recommendations
            </Typography>
            {insights.recommendedPurchases?.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ color: '#F5F5F7', mb: 0.8, lineHeight: 1.5 }}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Highest Consumed Medicines */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2.2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#8E8E93', fontWeight: 600, textTransform: 'uppercase', display: 'block', mb: 1 }}>
              High Consumption Trends
            </Typography>
            {insights.highestConsumedMedicines?.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ color: '#F5F5F7', mb: 0.8, lineHeight: 1.5 }}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Expiry Risk Warnings */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2.2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#D99B36', fontWeight: 600, textTransform: 'uppercase', display: 'block', mb: 1 }}>
              Batch Expiry Monitor
            </Typography>
            {insights.expiryWarnings?.map((item, idx) => (
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
          Inventory Analytics Engine
        </Typography>
        <Typography variant="caption" sx={{ color: '#6E8BFF', fontWeight: 500 }}>
          Reorder Monitor Active
        </Typography>
      </Box>
    </GlassCard>
  );
};
