import React, { useState } from 'react';
import { Box, Typography, Grid, Button, TextField, MenuItem } from '@mui/material';
import { GlassCard } from './GlassCard';
import { PatientAiSummaryResponse, aiApi } from '../api/aiApi';
import { enqueueSnackbar } from 'notistack';

interface PatientAiCopilotHeaderProps {
  summary: PatientAiSummaryResponse | null;
  loading?: boolean;
  prescriptionContext?: string;
  onLanguageChange?: (lang: string) => void;
  currentLanguage?: string;
}

export const PatientAiCopilotHeader: React.FC<PatientAiCopilotHeaderProps> = ({
  summary,
  loading,
  prescriptionContext = 'Amoxicillin 500mg, Paracetamol 500mg for Acute Bronchitis',
  onLanguageChange,
  currentLanguage = 'English',
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [qaAnswer, setQaAnswer] = useState<string | null>(null);
  const [asking, setAsking] = useState(false);

  const supportedLanguages = [
    { code: 'English', name: 'English' },
    { code: 'Telugu', name: 'తెలుగు (Telugu)' },
    { code: 'Hindi', name: 'हिन्दी (Hindi)' },
    { code: 'Spanish', name: 'Español (Spanish)' },
    { code: 'French', name: 'Français (French)' },
    { code: 'German', name: 'Deutsch (German)' },
  ];

  const handleLanguageSelect = (lang: string) => {
    setSelectedLanguage(lang);
    setQaAnswer(null);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  const handleAskQuestion = async (qText: string) => {
    if (!qText.trim()) return;
    setActiveQuestion(qText);
    setAsking(true);
    setQaAnswer(null);

    let targetLang = selectedLanguage;
    const qLower = qText.toLowerCase();
    if (qLower.includes('telugu')) targetLang = 'Telugu';
    else if (qLower.includes('hindi')) targetLang = 'Hindi';
    else if (qLower.includes('spanish')) targetLang = 'Spanish';

    try {
      const res = await aiApi.askContextQuestion(qText, prescriptionContext, targetLang);
      setQaAnswer(res.answer);
    } catch (err) {
      enqueueSnackbar('Question failed. Please try again.', { variant: 'error' });
    } finally {
      setAsking(false);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      handleAskQuestion(customInput);
      setCustomInput('');
    }
  };

  if (loading) {
    return (
      <GlassCard sx={{ mb: 4, py: 3.5, background: '#15171C' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#6E8BFF' }}>
            Preparing Daily Medication Summary ({selectedLanguage})...
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#8E8E93' }}>
          Formulating personalized food instructions, side effect profiles, and dose timing protocols in {selectedLanguage}.
        </Typography>
      </GlassCard>
    );
  }

  if (!summary) return null;

  return (
    <GlassCard sx={{ mb: 4, background: '#15171C' }}>
      {/* Top Banner Greeting & Language Selector */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 1.5 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.025em', mb: 0.5 }}>
            {summary.greeting}
          </Typography>
          <Typography variant="body2" sx={{ color: '#8E8E93' }}>
            Daily Overview & Guidelines ({selectedLanguage})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            select
            size="small"
            label="Response Language"
            value={selectedLanguage}
            onChange={(e) => handleLanguageSelect(e.target.value)}
            sx={{
              minWidth: 170,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: '0.82rem',
                backgroundColor: '#0B0B0D',
              },
            }}
          >
            {supportedLanguages.map((l) => (
              <MenuItem key={l.code} value={l.code} sx={{ fontSize: '0.82rem' }}>
                {l.name}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ px: 2, py: 0.8, borderRadius: '8px', background: 'rgba(59, 170, 116, 0.1)', border: '1px solid rgba(59, 170, 116, 0.25)' }}>
            <Typography variant="caption" sx={{ color: '#3BAA74', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
              Adherence Index
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#3BAA74', lineHeight: 1.2 }}>
              {summary.adherenceScore}% Optimal
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Identical #15171C Surface Guidance Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Why Prescribed & How to Take */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2.2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Typography variant="caption" sx={{ color: '#6E8BFF', fontWeight: 600, textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
              Why Prescribed & How to Take
            </Typography>
            <Typography variant="body2" sx={{ color: '#F5F5F7', fontWeight: 500, mb: 1, lineHeight: 1.5 }}>
              {summary.whyPrescribed}
            </Typography>
            <Typography variant="body2" sx={{ color: '#8E8E93', lineHeight: 1.5 }}>
              <strong>Guidance:</strong> {summary.howToTake}
            </Typography>
          </Box>
        </Grid>

        {/* Food Timing & Missed Dose Action */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2.2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Typography variant="caption" sx={{ color: '#6E8BFF', fontWeight: 600, textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
              Food Guidelines & Missed Dose Protocol
            </Typography>
            <Typography variant="body2" sx={{ color: '#F5F5F7', fontWeight: 500, mb: 1, lineHeight: 1.5 }}>
              <strong>Food Timing:</strong> {summary.foodInstructions}
            </Typography>
            <Typography variant="body2" sx={{ color: '#8E8E93', lineHeight: 1.5 }}>
              <strong>If Dose Missed:</strong> {summary.missedDoseAction}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Interactive Prescription Questions Section */}
      <Box sx={{ pt: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <Typography variant="caption" sx={{ color: '#8E8E93', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', mb: 1.5 }}>
          Ask Any Question About Your Prescription ({selectedLanguage})
        </Typography>

        {/* Custom Input Form */}
        <Box component="form" onSubmit={handleCustomSubmit} sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder={`Type any question in ${selectedLanguage}...`}
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#0B0B0D',
                fontSize: '0.9rem',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={asking || !customInput.trim()}
            sx={{
              backgroundColor: '#6E8BFF',
              color: '#F5F5F7',
              px: 3,
              borderRadius: '8px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Ask Question
          </Button>
        </Box>

        {/* Quick Suggestion Chips */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          {[
            "Explain today's prescription",
            "What if I miss today's dose?",
            "Can I take this after food?",
            "What precautions should I follow?",
          ].map((q, idx) => (
            <Button
              key={idx}
              size="small"
              variant="outlined"
              onClick={() => handleAskQuestion(q)}
              sx={{
                borderRadius: '16px',
                borderColor: activeQuestion === q ? '#6E8BFF' : 'rgba(255, 255, 255, 0.1)',
                color: activeQuestion === q ? '#6E8BFF' : '#8E8E93',
                fontSize: '0.78rem',
                textTransform: 'none',
                px: 2,
                py: 0.4,
                '&:hover': { borderColor: '#6E8BFF', color: '#F5F5F7', backgroundColor: 'transparent' },
              }}
            >
              {q}
            </Button>
          ))}
        </Box>

        {/* Dynamic Q&A Answer Box */}
        {(asking || qaAnswer) && (
          <Box sx={{ p: 2.2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <Typography variant="caption" sx={{ color: '#6E8BFF', fontWeight: 600, display: 'block', mb: 0.5 }}>
              Question: "{activeQuestion}" ({selectedLanguage})
            </Typography>
            {asking ? (
              <Typography variant="body2" sx={{ color: '#8E8E93' }}>
                Generating response in {selectedLanguage}...
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ color: '#F5F5F7', lineHeight: 1.5 }}>
                {qaAnswer}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </GlassCard>
  );
};
