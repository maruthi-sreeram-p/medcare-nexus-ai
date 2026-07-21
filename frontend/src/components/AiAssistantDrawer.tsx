import React, { useState } from 'react';
import { Box, Drawer, Typography, Button, TextField, CircularProgress, Chip, Divider } from '@mui/material';
import { aiApi } from '../api/aiApi';
import { enqueueSnackbar } from 'notistack';

interface Props {
  open: boolean;
  onClose: () => void;
  initialMedicine?: string;
}

export const AiAssistantDrawer: React.FC<Props> = ({ open, onClose, initialMedicine }) => {
  const [query, setQuery] = useState(initialMedicine || '');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleAsk = async (medicineName?: string) => {
    const targetMed = medicineName || query;
    if (!targetMed.trim()) return;

    setLoading(true);
    try {
      const res = await aiApi.explainMedicine(targetMed);
      setResponse(res.explanation);
    } catch (err: any) {
      enqueueSnackbar('AI Assistant request failed.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 480 },
          background: '#0f172a',
          color: '#f8fafc',
          borderLeft: '1px solid rgba(6, 182, 212, 0.3)',
          p: 3,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Gemini AI Medical Assistant
        </Typography>
        <Button size="small" variant="outlined" onClick={onClose} sx={{ color: '#94a3b8', borderColor: '#334155' }}>
          Close
        </Button>
      </Box>

      <Box
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        }}
      >
        <Typography variant="caption" sx={{ color: '#fca5a5', lineHeight: 1.5, display: 'block' }}>
          <strong>AI Guardrails Active:</strong> Medicare Nexus AI NEVER diagnoses diseases or prescribes medicines. It only explains medication dosage, timing, precautions, and side effects.
        </Typography>
      </Box>

      <Typography variant="subtitle2" sx={{ mb: 1, color: '#94a3b8', fontWeight: 600 }}>
        Quick Prescribed Medicine Lookup:
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
        {['Amoxicillin', 'Paracetamol', 'Metformin', 'Ibuprofen'].map((med) => (
          <Chip
            key={med}
            label={med}
            clickable
            onClick={() => {
              setQuery(med);
              handleAsk(med);
            }}
            sx={{ background: 'rgba(6, 182, 212, 0.15)', color: '#67e8f9', border: '1px solid rgba(6, 182, 212, 0.3)', fontWeight: 700 }}
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Ask about a medicine or regimen..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <Button
          variant="contained"
          onClick={() => handleAsk()}
          disabled={loading}
          sx={{ background: '#06b6d4', fontWeight: 700, px: 3 }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Ask AI'}
        </Button>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 3 }} />

      {response ? (
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255,255,255,0.1)',
            maxHeight: 'calc(100vh - 360px)',
            overflowY: 'auto',
          }}
        >
          <Typography variant="subtitle2" sx={{ color: '#06b6d4', fontWeight: 700, mb: 1 }}>
            Gemini AI Explanation Response:
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{ color: '#e2e8f0', whiteSpace: 'pre-wrap', lineHeight: 1.7, fontSize: '0.9rem' }}
          >
            {response}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', py: 6, color: '#64748b' }}>
          <Typography variant="body2">Enter a medicine name above to ask Gemini AI for simple explanations and side effects.</Typography>
        </Box>
      )}
    </Drawer>
  );
};
