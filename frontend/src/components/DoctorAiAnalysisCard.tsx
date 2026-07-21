import React from 'react';
import { Box, Typography, Grid, Divider, LinearProgress } from '@mui/material';
import { GlassCard } from './GlassCard';
import { DoctorAiAnalysisResponse } from '../api/aiApi';

interface DoctorAiAnalysisCardProps {
  analysis: DoctorAiAnalysisResponse | null;
  loading?: boolean;
}

export const DoctorAiAnalysisCard: React.FC<DoctorAiAnalysisCardProps> = ({ analysis, loading }) => {
  if (loading) {
    return (
      <GlassCard sx={{ mb: 4, py: 3.5, background: '#15171C' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#6E8BFF' }}>
            Evaluating Clinical Regimen...
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#8E8E93', mb: 2 }}>
          Checking pharmacological compatibility, drug interactions, contraindications, and dosage protocols.
        </Typography>
        <LinearProgress
          sx={{
            height: 3,
            borderRadius: 2,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#6E8BFF',
            },
          }}
        />
      </GlassCard>
    );
  }

  if (!analysis) return null;

  return (
    <GlassCard sx={{ mb: 4, background: '#15171C' }}>
      {/* Header Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 1.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.02em' }}>
          Clinical Regimen Review
        </Typography>
        <Typography variant="caption" sx={{ color: '#3BAA74', fontWeight: 600 }}>
          High Compatibility Score
        </Typography>
      </Box>

      {/* Main Regimen Evaluation Summary */}
      <Box sx={{ p: 2.5, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', mb: 3 }}>
        <Typography variant="caption" sx={{ color: '#8E8E93', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', mb: 0.5 }}>
          Regimen Evaluation
        </Typography>
        <Typography variant="body1" sx={{ color: '#F5F5F7', fontWeight: 500, lineHeight: 1.6 }}>
          {analysis.summary}
        </Typography>
      </Box>

      {/* 4-Grid Breakdown — All Using Identical #15171C Surface Styling */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        {/* Drug Interactions & Duplicate Warnings */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2.2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#6E8BFF', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block', mb: 1 }}>
              Drug Interaction & Duplicate Review
            </Typography>
            {analysis.drugInteractions?.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ color: '#F5F5F7', mb: 0.8, lineHeight: 1.5 }}>
                • {item}
              </Typography>
            ))}
            {analysis.duplicateWarnings?.map((item, idx) => (
              <Typography key={`dup-${idx}`} variant="body2" sx={{ color: '#F5F5F7', lineHeight: 1.5 }}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Medicines Pharmacological Breakdown */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2.2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#6E8BFF', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block', mb: 1 }}>
              Pharmacological Details
            </Typography>
            {analysis.medicinesExplained?.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ color: '#F5F5F7', mb: 0.8, lineHeight: 1.5 }}>
                • {item}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Side Effects & Precautions */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2.2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#6E8BFF', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block', mb: 1 }}>
              Side Effects & Precautions
            </Typography>
            {analysis.sideEffects?.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ color: '#F5F5F7', mb: 0.5, lineHeight: 1.5 }}>
                • Side Effect: {item}
              </Typography>
            ))}
            {analysis.precautions?.map((item, idx) => (
              <Typography key={`pre-${idx}`} variant="body2" sx={{ color: '#F5F5F7', lineHeight: 1.5 }}>
                • Precaution: {item}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Patient Instructions & Timing Schedule */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2.2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#6E8BFF', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block', mb: 1 }}>
              Patient Instructions & Timing
            </Typography>
            <Typography variant="body2" sx={{ color: '#F5F5F7', mb: 1, lineHeight: 1.5 }}>
              <strong>Instructions:</strong> {analysis.patientInstructions}
            </Typography>
            <Typography variant="body2" sx={{ color: '#F5F5F7', lineHeight: 1.5 }}>
              <strong>Schedule:</strong> {analysis.timingSchedule}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.06)' }} />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" sx={{ color: '#8E8E93' }}>
          Clinical Evaluation Summary
        </Typography>
        <Typography variant="caption" sx={{ color: '#6E8BFF', fontWeight: 500 }}>
          Review Complete
        </Typography>
      </Box>
    </GlassCard>
  );
};
