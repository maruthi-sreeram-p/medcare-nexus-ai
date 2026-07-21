import { axiosClient } from './axiosClient';

export const patientApi = {
  getPrescriptions: async () => {
    const res = await axiosClient.get('/patient/prescriptions');
    return res.data;
  },
  getSchedule: async () => {
    const res = await axiosClient.get('/patient/schedule');
    return res.data;
  },
  updateLogStatus: async (logId: number, status: 'TAKEN' | 'MISSED' | 'PENDING') => {
    const res = await axiosClient.post(`/patient/medication-logs/${logId}/status`, { status });
    return res.data;
  },
  getAdherence: async () => {
    const res = await axiosClient.get('/patient/adherence');
    return res.data;
  },
};
