import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Chip, CircularProgress, Alert } from '@mui/material';
import { GlassCard } from '../../components/GlassCard';
import { doctorApi } from '../../api/doctorApi';
import { aiApi, DoctorAiAnalysisResponse } from '../../api/aiApi';
import { DoctorAiAnalysisCard } from '../../components/DoctorAiAnalysisCard';
import { enqueueSnackbar } from 'notistack';

export const DoctorDashboard: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Automatic Analysis State
  const [aiAnalysis, setAiAnalysis] = useState<DoctorAiAnalysisResponse | null>(null);
  const [analyzingAi, setAnalyzingAi] = useState(false);

  // New Prescription Dialog State
  const [openRxModal, setOpenRxModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<number | ''>('');
  const [diagnosis, setDiagnosis] = useState('');
  const [selectedMedicineId, setSelectedMedicineId] = useState<number>(1);
  const [dosage, setDosage] = useState('500mg');
  const [frequency, setFrequency] = useState('Twice Daily');
  const [durationDays, setDurationDays] = useState(7);
  const [instructions, setInstructions] = useState('Take after meal with full glass of water');
  const [timingSchedule, setTimingSchedule] = useState('Morning, Night');
  const [particularTime, setParticularTime] = useState('08:00 AM');
  const [creating, setCreating] = useState(false);

  const fetchData = async () => {
    try {
      const [pts, rxs, meds] = await Promise.all([
        doctorApi.getPatients(),
        doctorApi.getPrescriptions(),
        doctorApi.getMedicinesWithStock(),
      ]);
      setPatients(pts);
      setPrescriptions(rxs);
      setMedicines(meds);
      if (pts.length > 0) setSelectedPatientId(pts[0].id);
      if (meds.length > 0) setSelectedMedicineId(meds[0].id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectedMedicineObj = medicines.find((m) => m.id === Number(selectedMedicineId));
  const selectedPatientObj = patients.find((p) => p.id === Number(selectedPatientId));

  const getFrequencyMult = (freqStr: string) => {
    const f = freqStr.toLowerCase();
    if (f.includes('thrice') || f.includes('3 times') || f.includes('three')) return 3;
    if (f.includes('four') || f.includes('4 times')) return 4;
    if (f.includes('once') || f.includes('1 time') || f.includes('single')) return 1;
    return 2;
  };

  const freqMult = getFrequencyMult(frequency);
  const totalDeductionUnits = durationDays * freqMult;

  const handleCreatePrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId) return;

    setCreating(true);
    setAnalyzingAi(true);
    setOpenRxModal(false);

    try {
      await doctorApi.createPrescription({
        patientId: Number(selectedPatientId),
        diagnosisNotes: diagnosis,
        items: [
          {
            medicineId: Number(selectedMedicineId),
            dosage,
            frequency,
            durationDays: Number(durationDays),
            instructions,
            timingSchedule,
            particularTime,
          },
        ],
      });

      enqueueSnackbar(`Prescription created. ${totalDeductionUnits} units deducted from inventory.`, { variant: 'success' });
      await fetchData();

      const medName = selectedMedicineObj ? selectedMedicineObj.name : 'Amoxicillin 500mg';
      const patientName = selectedPatientObj ? selectedPatientObj.fullName : 'John Doe';
      
      const analysisRes = await aiApi.analyzeDoctorPrescription({
        patientName,
        diagnosis,
        medicines: [medName],
        instructions,
      });

      setAiAnalysis(analysisRes);
    } catch (err: any) {
      enqueueSnackbar('Failed to create prescription.', { variant: 'error' });
    } finally {
      setCreating(false);
      setAnalyzingAi(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 14 }}>
        <CircularProgress sx={{ color: '#6D8DFF' }} size={36} />
        <Typography variant="body2" sx={{ color: '#8E8E93', mt: 2 }}>
          Loading Physician Workspace...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', mb: 0.5 }}>
            Clinical Portal
          </Typography>
          <Typography variant="body2" sx={{ color: '#8E8E93' }}>
            Prescription management, drug interaction review, and patient record tracking.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => setOpenRxModal(true)}
          sx={{
            backgroundColor: '#6D8DFF',
            color: '#F5F5F7',
            fontWeight: 600,
            px: 3,
            py: 1.2,
            borderRadius: '10px',
            '&:hover': { backgroundColor: '#5272E2' },
          }}
        >
          New Prescription
        </Button>
      </Box>

      {/* Regimen Evaluation Card */}
      {(analyzingAi || aiAnalysis) && (
        <DoctorAiAnalysisCard analysis={aiAnalysis} loading={analyzingAi} />
      )}

      {/* Main Grid: Patients & Prescriptions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Patient Roster */}
        <Grid item xs={12} md={4}>
          <GlassCard sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#F5F5F7' }}>
                Patients ({patients.length})
              </Typography>
            </Box>

            {patients.map((p) => (
              <Box
                key={p.id}
                sx={{
                  p: 2,
                  mb: 1.5,
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.2s ease',
                  '&:hover': { borderColor: 'rgba(255, 255, 255, 0.12)' },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#F5F5F7' }}>
                    {p.fullName}
                  </Typography>
                  <Chip label={p.gender || 'Patient'} size="small" sx={{ background: 'rgba(255, 255, 255, 0.05)', color: '#8E8E93', fontSize: '0.7rem' }} />
                </Box>
                <Typography variant="body2" sx={{ color: '#8E8E93', fontSize: '0.85rem' }}>
                  Blood Group: <strong style={{ color: '#E55353' }}>{p.bloodGroup || 'O+'}</strong>
                </Typography>
                <Typography variant="caption" sx={{ color: '#E5A93C', display: 'block', mt: 0.5 }}>
                  Allergies: {p.allergies || 'Penicillin'}
                </Typography>
              </Box>
            ))}
          </GlassCard>
        </Grid>

        {/* Clinical Prescription Stream */}
        <Grid item xs={12} md={8}>
          <GlassCard>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#F5F5F7' }}>
                Prescription History
              </Typography>
              <Typography variant="caption" sx={{ color: '#8E8E93' }}>
                Total Records: {prescriptions.length}
              </Typography>
            </Box>

            {prescriptions.map((rx) => (
              <Box
                key={rx.id}
                sx={{
                  p: 2.5,
                  mb: 2,
                  borderRadius: '12px',
                  background: '#111114',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.2s ease',
                  '&:hover': { borderColor: 'rgba(255, 255, 255, 0.12)' },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Chip label={`#RX-${rx.id}`} size="small" sx={{ background: 'rgba(109, 141, 255, 0.12)', color: '#6D8DFF', fontWeight: 600 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#F5F5F7' }}>
                      {rx.patient?.user?.fullName || 'John Doe'}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#8E8E93' }}>
                    Diagnosis: {rx.diagnosisNotes}
                  </Typography>
                </Box>

                <Box sx={{ mb: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {rx.items?.map((it: any) => (
                    <Chip
                      key={it.id}
                      label={`${it.medicine?.name} ${it.dosage} (${it.frequency})`}
                      size="small"
                      sx={{ background: 'rgba(255, 255, 255, 0.04)', color: '#F5F5F7', border: '1px solid rgba(255, 255, 255, 0.08)', fontWeight: 500 }}
                    />
                  ))}
                </Box>

                <Box sx={{ p: 1.8, borderRadius: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <Typography variant="caption" sx={{ color: '#8E8E93', fontWeight: 600, textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                    Clinical Evaluation
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#F5F5F7', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                    {rx.aiSummary}
                  </Typography>
                </Box>
              </Box>
            ))}
          </GlassCard>
        </Grid>
      </Grid>

      {/* Create Prescription Dialog */}
      <Dialog
        open={openRxModal}
        onClose={() => setOpenRxModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: '#17181D',
            color: '#F5F5F7',
            p: 1,
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#F5F5F7', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', pb: 2 }}>
          Issue Clinical Prescription
        </DialogTitle>
        <form onSubmit={handleCreatePrescription}>
          <DialogContent sx={{ py: 3 }}>
            <TextField
              fullWidth
              select
              label="Select Patient"
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(Number(e.target.value))}
              sx={{ mb: 2.5 }}
            >
              {patients.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.fullName} ({p.email})
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Diagnosis Notes"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="e.g. Acute Bacterial Bronchitis"
              required
              sx={{ mb: 2.5 }}
            />

            <Typography variant="caption" sx={{ mb: 1, color: '#8E8E93', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>
              Select Medication Catalog
            </Typography>

            <TextField
              fullWidth
              select
              label="Medicine & Stock Inventory Status"
              value={selectedMedicineId}
              onChange={(e) => setSelectedMedicineId(Number(e.target.value))}
              sx={{ mb: 2.5 }}
            >
              {medicines.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  {m.name} ({m.unit}) — Stock: {m.stockQuantity} units [{m.stockStatus}]
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ p: 2, mb: 2.5, borderRadius: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <Typography variant="caption" sx={{ color: '#8E8E93', fontWeight: 600, display: 'block', mb: 0.5 }}>
                INVENTORY DEDUCTION
              </Typography>
              <Typography variant="body2" sx={{ color: '#F5F5F7' }}>
                {durationDays} Days × {freqMult} Doses/Day = <strong>{totalDeductionUnits} Units</strong> will be deducted from inventory.
              </Typography>
            </Box>

            {selectedMedicineObj?.aiWarning && (
              <Alert severity="warning" sx={{ mb: 2.5, fontWeight: 500, borderRadius: '8px', background: 'rgba(229, 169, 60, 0.1)', color: '#E5A93C' }}>
                {selectedMedicineObj.aiWarning}
              </Alert>
            )}

            <Grid container spacing={2} sx={{ mb: 2.5 }}>
              <Grid item xs={4}>
                <TextField fullWidth label="Dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth label="Frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth type="number" label="Duration (Days)" value={durationDays} onChange={(e) => setDurationDays(Number(e.target.value))} />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              select
              label="Scheduled Dose Time"
              value={particularTime}
              onChange={(e) => setParticularTime(e.target.value)}
              sx={{ mb: 2.5 }}
            >
              <MenuItem value="08:00 AM">Morning Dose — 08:00 AM</MenuItem>
              <MenuItem value="02:00 PM">Afternoon Dose — 02:00 PM</MenuItem>
              <MenuItem value="08:00 PM">Evening Dose — 08:00 PM</MenuItem>
              <MenuItem value="10:00 PM">Night Bedtime Dose — 10:00 PM</MenuItem>
            </TextField>

            <TextField fullWidth label="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} sx={{ mb: 2.5 }} />
            <TextField fullWidth label="Timing Schedule" value={timingSchedule} onChange={(e) => setTimingSchedule(e.target.value)} />
          </DialogContent>

          <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <Button onClick={() => setOpenRxModal(false)} sx={{ color: '#8E8E93' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={creating}
              sx={{
                backgroundColor: '#6D8DFF',
                color: '#F5F5F7',
                fontWeight: 600,
              }}
            >
              {creating ? 'Issuing Prescription...' : `Issue Prescription`}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
