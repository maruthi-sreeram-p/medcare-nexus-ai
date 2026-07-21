import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, Chip, CircularProgress, LinearProgress } from '@mui/material';
import { GlassCard } from '../../components/GlassCard';
import { PatientAiCopilotHeader } from '../../components/PatientAiCopilotHeader';
import { patientApi } from '../../api/patientApi';
import { aiApi, PatientAiSummaryResponse } from '../../api/aiApi';
import { enqueueSnackbar } from 'notistack';

export const PatientDashboard: React.FC = () => {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [adherence, setAdherence] = useState<any>(null);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Multi-Language AI Daily Guidance State
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [aiSummary, setAiSummary] = useState<PatientAiSummaryResponse | null>(null);
  const [loadingAiSummary, setLoadingAiSummary] = useState(true);
  const [adherenceAiInsight, setAdherenceAiInsight] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [sch, adh, rxs] = await Promise.all([
        patientApi.getSchedule(),
        patientApi.getAdherence(),
        patientApi.getPrescriptions(),
      ]);
      setSchedule(sch);
      setAdherence(adh);
      setPrescriptions(rxs);

      const patientName = rxs.length > 0 ? rxs[0].patient?.user?.fullName : 'John Doe';
      const diagnosis = rxs.length > 0 ? rxs[0].diagnosisNotes : 'Acute Infection';
      const meds = rxs.length > 0 ? rxs[0].items?.map((i: any) => i.medicine?.name).join(', ') : 'Amoxicillin, Paracetamol';

      fetchAiSummary(patientName, diagnosis, meds, currentLanguage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAiSummary = async (pName?: string, diag?: string, meds?: string, lang?: string) => {
    setLoadingAiSummary(true);
    try {
      const res = await aiApi.getPatientDailySummary(pName, diag, meds, lang || currentLanguage);
      setAiSummary(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAiSummary(false);
    }
  };

  const handleLanguageChange = (newLang: string) => {
    setCurrentLanguage(newLang);
    const patientName = prescriptions.length > 0 ? prescriptions[0].patient?.user?.fullName : 'John Doe';
    const diagnosis = prescriptions.length > 0 ? prescriptions[0].diagnosisNotes : 'Acute Infection';
    const meds = prescriptions.length > 0 ? prescriptions[0].items?.map((i: any) => i.medicine?.name).join(', ') : 'Amoxicillin, Paracetamol';
    fetchAiSummary(patientName, diagnosis, meds, newLang);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMarkStatus = async (logId: number, status: 'TAKEN' | 'MISSED') => {
    try {
      await patientApi.updateLogStatus(logId, status);
      enqueueSnackbar(`Medication marked as ${status}`, { variant: status === 'TAKEN' ? 'success' : 'warning' });

      if (status === 'TAKEN') {
        setAdherenceAiInsight('Dose logged. Adherence streak extended.');
      } else {
        setAdherenceAiInsight('Dose marked as missed. Take next scheduled dose at regular time. Do not double doses.');
      }

      fetchData();
    } catch (err) {
      enqueueSnackbar('Failed to update dose log.', { variant: 'error' });
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 14 }}>
        <CircularProgress sx={{ color: '#6D8DFF' }} size={36} />
        <Typography variant="body2" sx={{ color: '#8E8E93', mt: 2 }}>
          Loading Medication Schedule...
        </Typography>
      </Box>
    );
  }

  const rxContext = prescriptions.length > 0
    ? `Diagnosis: ${prescriptions[0].diagnosisNotes}. Regimen: ${prescriptions[0].items?.map((i: any) => i.medicine?.name).join(', ')}`
    : 'Amoxicillin 500mg, Paracetamol 500mg for Acute Bronchitis';

  return (
    <Box>
      {/* Header Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em' }}>
            Patient Care Portal
          </Typography>
          <Typography variant="body2" sx={{ color: '#8E8E93' }}>
            Daily schedule, instructions, and adherence log.
          </Typography>
        </Box>

        <Box sx={{ p: 1.2, px: 2, borderRadius: '10px', background: 'rgba(59, 170, 116, 0.1)', border: '1px solid rgba(59, 170, 116, 0.25)' }}>
          <Typography variant="caption" sx={{ color: '#3BAA74', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
            Active Streak
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#3BAA74', lineHeight: 1 }}>
            {adherence?.currentStreakDays || 1} Days Active
          </Typography>
        </Box>
      </Box>

      {/* Proactive Patient Guidance Header with Multi-Language Support */}
      <PatientAiCopilotHeader
        summary={aiSummary}
        loading={loadingAiSummary}
        prescriptionContext={rxContext}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />

      {/* Adherence Insight Banner */}
      {adherenceAiInsight && (
        <Box sx={{ p: 2, mb: 4, borderRadius: '10px', background: 'rgba(109, 141, 255, 0.08)', border: '1px solid rgba(109, 141, 255, 0.2)' }}>
          <Typography variant="body2" sx={{ color: '#6D8DFF', fontWeight: 500 }}>
            {adherenceAiInsight}
          </Typography>
        </Box>
      )}

      {/* Medication Adherence Score Card */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <GlassCard>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#F5F5F7' }}>
                Medication Adherence
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#6D8DFF' }}>
                {adherence?.adherencePercentage || 100}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={adherence?.adherencePercentage || 100}
              sx={{
                height: 6,
                borderRadius: 3,
                mb: 2.5,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#6D8DFF',
                },
              }}
            />

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="caption" sx={{ color: '#8E8E93' }}>Taken Doses</Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#3BAA74' }}>{adherence?.takenDoses || 1}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="caption" sx={{ color: '#8E8E93' }}>Pending Doses</Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#6D8DFF' }}>{adherence?.pendingDoses || 1}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="caption" sx={{ color: '#8E8E93' }}>Missed Doses</Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#E55353' }}>{adherence?.missedDoses || 0}</Typography>
              </Grid>
            </Grid>
          </GlassCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <GlassCard sx={{ height: '100%', background: '#17181D' }}>
            <Typography variant="caption" sx={{ color: '#8E8E93', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', mb: 1 }}>
              Prescribed Regimen Context
            </Typography>
            <Typography variant="body2" sx={{ color: '#F5F5F7', fontWeight: 600, mb: 1 }}>
              {prescriptions.length > 0 ? prescriptions[0].diagnosisNotes : 'Acute Bronchitis Therapy'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#8E8E93', lineHeight: 1.5, display: 'block' }}>
              Contains {prescriptions.length > 0 ? prescriptions[0].items?.map((i: any) => i.medicine?.name).join(', ') : 'Amoxicillin, Paracetamol'}.
            </Typography>
          </GlassCard>
        </Grid>
      </Grid>

      {/* Daily Schedule Timeline Section */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2.5, color: '#F5F5F7', letterSpacing: '-0.02em' }}>
        Today's Schedule
      </Typography>

      <Grid container spacing={3}>
        {schedule.map((item) => {
          const isTaken = item.status === 'TAKEN';
          const isMissed = item.status === 'MISSED';

          return (
            <Grid item xs={12} md={6} key={item.logId}>
              <GlassCard
                sx={{
                  borderLeft: isTaken
                    ? '4px solid #3BAA74'
                    : isMissed
                    ? '4px solid #E55353'
                    : '4px solid #6D8DFF',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#F5F5F7' }}>
                      {item.medicineName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#8E8E93' }}>
                      Dosage: <strong style={{ color: '#F5F5F7' }}>{item.dosage}</strong> | {item.frequency}
                    </Typography>
                  </Box>

                  <Chip
                    label={item.status}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      background: isTaken
                        ? 'rgba(59, 170, 116, 0.12)'
                        : isMissed
                        ? 'rgba(229, 83, 83, 0.12)'
                        : 'rgba(109, 141, 255, 0.12)',
                      color: isTaken ? '#3BAA74' : isMissed ? '#E55353' : '#6D8DFF',
                    }}
                  />
                </Box>

                <Box sx={{ p: 1.8, borderRadius: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', mb: 2.5 }}>
                  <Typography variant="caption" sx={{ color: '#8E8E93', display: 'block' }}>
                    Scheduled Time: <strong style={{ color: '#F5F5F7' }}>{item.scheduledTime ? item.scheduledTime.substring(11, 16) : '08:00 AM'}</strong>
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#8E8E93', display: 'block', mt: 0.5 }}>
                    Instructions: {item.instructions || 'Take after meal with water'}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Button
                    size="small"
                    variant={isTaken ? 'contained' : 'outlined'}
                    disabled={isTaken}
                    onClick={() => handleMarkStatus(item.logId, 'TAKEN')}
                    sx={{
                      flex: 1,
                      backgroundColor: isTaken ? '#3BAA74' : 'transparent',
                      borderColor: 'rgba(255, 255, 255, 0.12)',
                      color: isTaken ? '#F5F5F7' : '#3BAA74',
                      fontWeight: 600,
                    }}
                  >
                    {isTaken ? 'Dose Taken' : 'Mark Taken'}
                  </Button>

                  <Button
                    size="small"
                    variant={isMissed ? 'contained' : 'outlined'}
                    disabled={isMissed}
                    onClick={() => handleMarkStatus(item.logId, 'MISSED')}
                    sx={{
                      flex: 1,
                      backgroundColor: isMissed ? '#E55353' : 'transparent',
                      borderColor: 'rgba(255, 255, 255, 0.12)',
                      color: isMissed ? '#F5F5F7' : '#E55353',
                      fontWeight: 600,
                    }}
                  >
                    {isMissed ? 'Dose Missed' : 'Mark Missed'}
                  </Button>
                </Box>
              </GlassCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
