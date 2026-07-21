import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress, Button, Grid } from '@mui/material';
import { GlassCard } from '../../components/GlassCard';
import { InventoryAiInsightsCard } from '../../components/InventoryAiInsightsCard';
import { staffApi } from '../../api/staffApi';
import { aiApi, StaffInventoryAiResponse } from '../../api/aiApi';
import { enqueueSnackbar } from 'notistack';

export const StaffDashboard: React.FC = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [lowStock, setLowStock] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Inventory AI Insights State
  const [aiInsights, setAiInsights] = useState<StaffInventoryAiResponse | null>(null);
  const [loadingAi, setLoadingAi] = useState(true);

  // Add Medicine Modal State
  const [openAddModal, setOpenAddModal] = useState(false);
  const [name, setName] = useState('');
  const [genericName, setGenericName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [category, setCategory] = useState('Antibiotic');
  const [dosageForm, setDosageForm] = useState('Tablet');
  const [unit, setUnit] = useState('500mg');
  const [initialStock, setInitialStock] = useState(50);
  const [reorderLevel, setReorderLevel] = useState(15);
  const [pricePerUnit, setPricePerUnit] = useState(10.0);
  const [adding, setAdding] = useState(false);

  // Update Stock Modal State
  const [openStockModal, setOpenStockModal] = useState(false);
  const [selectedInvId, setSelectedInvId] = useState<number | null>(null);
  const [newQuantity, setNewQuantity] = useState(100);

  const fetchData = async () => {
    try {
      const [inv, low] = await Promise.all([staffApi.getInventory(), staffApi.getLowStock()]);
      setInventory(inv);
      setLowStock(low);
      fetchAiInsights();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAiInsights = async () => {
    setLoadingAi(true);
    try {
      const res = await aiApi.getInventoryAiInsights();
      setAiInsights(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddMedicine = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      await staffApi.addMedicine({
        name,
        genericName,
        manufacturer,
        category,
        dosageForm,
        unit,
        initialStock: Number(initialStock),
        reorderLevel: Number(reorderLevel),
        pricePerUnit: Number(pricePerUnit),
      });
      enqueueSnackbar('New medicine added to inventory.', { variant: 'success' });
      setOpenAddModal(false);
      fetchData();
    } catch (err) {
      enqueueSnackbar('Failed to add medicine.', { variant: 'error' });
    } finally {
      setAdding(false);
    }
  };

  const handleUpdateStock = async () => {
    if (!selectedInvId) return;
    try {
      await staffApi.updateStock(selectedInvId, Number(newQuantity));
      enqueueSnackbar('Stock quantity updated.', { variant: 'success' });
      setOpenStockModal(false);
      fetchData();
    } catch (err) {
      enqueueSnackbar('Stock update failed.', { variant: 'error' });
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 14 }}>
        <CircularProgress sx={{ color: '#6D8DFF' }} size={36} />
        <Typography variant="body2" sx={{ color: '#8E8E93', mt: 2 }}>
          Loading Pharmacy Inventory...
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
            Pharmacy Operations
          </Typography>
          <Typography variant="body2" sx={{ color: '#8E8E93' }}>
            Inventory stock levels, depletion analytics, and batch management.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => setOpenAddModal(true)}
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
          Add New Medicine
        </Button>
      </Box>

      {/* Pharmacy Predictive Insights Card */}
      <InventoryAiInsightsCard insights={aiInsights} loading={loadingAi} />

      {/* Stock Items Grid */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.02em' }}>
          Medicine Catalog
        </Typography>
        <Typography variant="caption" sx={{ color: '#8E8E93' }}>
          Total Items: {inventory.length}
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        {inventory.map((inv) => {
          const isLow = inv.stockQuantity <= inv.reorderLevel;

          return (
            <Grid item xs={12} sm={6} md={4} key={inv.id}>
              <GlassCard
                sx={{
                  borderLeft: isLow ? '4px solid #E55353' : '4px solid #3BAA74',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#F5F5F7' }}>
                      {inv.medicine?.name}
                    </Typography>
                    <Chip
                      label={inv.status}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        background: isLow ? 'rgba(229, 83, 83, 0.12)' : 'rgba(59, 170, 116, 0.12)',
                        color: isLow ? '#E55353' : '#3BAA74',
                      }}
                    />
                  </Box>

                  <Typography variant="body2" sx={{ color: '#8E8E93', mb: 1.5 }}>
                    {inv.medicine?.genericName} • {inv.medicine?.dosageForm} ({inv.medicine?.unit})
                  </Typography>

                  <Box sx={{ p: 1.8, borderRadius: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" sx={{ color: '#8E8E93' }}>Available Stock</Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isLow ? '#E55353' : '#6D8DFF' }}>
                        {inv.stockQuantity} Units
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#8E8E93' }}>Reorder Threshold</Typography>
                      <Typography variant="caption" sx={{ color: '#F5F5F7' }}>{inv.reorderLevel} Units</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#F5F5F7' }}>
                    ${inv.pricePerUnit}/unit
                  </Typography>

                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setSelectedInvId(inv.id);
                      setNewQuantity(inv.stockQuantity + 50);
                      setOpenStockModal(true);
                    }}
                    sx={{
                      borderRadius: '8px',
                      borderColor: 'rgba(255, 255, 255, 0.12)',
                      color: '#F5F5F7',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      '&:hover': { borderColor: '#6D8DFF' },
                    }}
                  >
                    Update Stock
                  </Button>
                </Box>
              </GlassCard>
            </Grid>
          );
        })}
      </Grid>

      {/* Update Stock Modal */}
      <Dialog
        open={openStockModal}
        onClose={() => setOpenStockModal(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { background: '#17181D', color: '#F5F5F7', p: 1, borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#F5F5F7' }}>Update Stock Quantity</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="number"
            label="New Stock Quantity"
            value={newQuantity}
            onChange={(e) => setNewQuantity(Number(e.target.value))}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenStockModal(false)} sx={{ color: '#8E8E93' }}>Cancel</Button>
          <Button onClick={handleUpdateStock} variant="contained" sx={{ backgroundColor: '#6D8DFF', color: '#F5F5F7', fontWeight: 600 }}>
            Save Stock
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Medicine Modal */}
      <Dialog
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { background: '#17181D', color: '#F5F5F7', p: 1, borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#F5F5F7' }}>Add New Medicine to Pharmacy</DialogTitle>
        <form onSubmit={handleAddMedicine}>
          <DialogContent>
            <TextField fullWidth label="Medicine Name" value={name} onChange={(e) => setName(e.target.value)} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Generic Name" value={genericName} onChange={(e) => setGenericName(e.target.value)} sx={{ mb: 2 }} />
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField fullWidth label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Dosage Form" value={dosageForm} onChange={(e) => setDosageForm(e.target.value)} />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={4}>
                <TextField fullWidth label="Unit" value={unit} onChange={(e) => setUnit(e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth type="number" label="Initial Stock" value={initialStock} onChange={(e) => setInitialStock(Number(e.target.value))} />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth type="number" label="Reorder Level" value={reorderLevel} onChange={(e) => setReorderLevel(Number(e.target.value))} />
              </Grid>
            </Grid>
            <TextField fullWidth type="number" label="Price per Unit ($)" value={pricePerUnit} onChange={(e) => setPricePerUnit(Number(e.target.value))} />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenAddModal(false)} sx={{ color: '#8E8E93' }}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={adding} sx={{ backgroundColor: '#6D8DFF', color: '#F5F5F7', fontWeight: 600 }}>
              {adding ? 'Adding...' : 'Add Medicine'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
