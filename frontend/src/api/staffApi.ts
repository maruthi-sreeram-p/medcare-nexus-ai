import { axiosClient } from './axiosClient';

export interface AddMedicineParams {
  name: string;
  genericName?: string;
  manufacturer?: string;
  category?: string;
  dosageForm?: string;
  unit?: string;
  description?: string;
  initialStock: number;
  reorderLevel: number;
  pricePerUnit: number;
  batchNumber?: string;
  expiryDate?: string;
}

export const staffApi = {
  getInventory: async () => {
    const res = await axiosClient.get('/staff/inventory');
    return res.data;
  },
  getLowStock: async () => {
    const res = await axiosClient.get('/staff/inventory/low-stock');
    return res.data;
  },
  addMedicine: async (data: AddMedicineParams) => {
    const res = await axiosClient.post('/staff/medicines', data);
    return res.data;
  },
  updateStock: async (id: number, newQuantity: number, reorderLevel?: number) => {
    const res = await axiosClient.put(`/staff/inventory/${id}`, { newQuantity, reorderLevel });
    return res.data;
  },
};
