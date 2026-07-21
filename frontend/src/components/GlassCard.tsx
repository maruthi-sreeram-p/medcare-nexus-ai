import React from 'react';
import { Paper, PaperProps } from '@mui/material';

export const GlassCard: React.FC<PaperProps> = ({ children, sx, ...props }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '12px',
        background: '#15171C',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: 'none',
        transition: 'border-color 0.15s ease-in-out',
        '&:hover': {
          borderColor: 'rgba(255, 255, 255, 0.12)',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};
