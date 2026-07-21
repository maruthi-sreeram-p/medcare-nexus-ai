import { axiosClient } from './axiosClient';

export const adminApi = {
  getStats: async () => {
    const res = await axiosClient.get('/admin/stats');
    return res.data;
  },
  getUsers: async () => {
    const res = await axiosClient.get('/admin/users');
    return res.data;
  },
  updateUserStatus: async (userId: number, status: 'ACTIVE' | 'INACTIVE') => {
    const res = await axiosClient.put(`/admin/users/${userId}/status`, { status });
    return res.data;
  },
  getMedicines: async () => {
    const res = await axiosClient.get('/admin/medicines');
    return res.data;
  },
};
