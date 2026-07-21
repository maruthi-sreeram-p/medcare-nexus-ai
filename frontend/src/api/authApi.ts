import { axiosClient } from './axiosClient';

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  password: string;
  fullName: string;
  role: string;
  phone?: string;
  specialization?: string;
  licenseNumber?: string;
  bloodGroup?: string;
  emergencyContact?: string;
}

export const authApi = {
  login: async (params: LoginParams) => {
    const response = await axiosClient.post('/auth/login', params);
    return response.data;
  },
  register: async (params: RegisterParams) => {
    const response = await axiosClient.post('/auth/register', params);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await axiosClient.get('/auth/me');
    return response.data;
  },
};
