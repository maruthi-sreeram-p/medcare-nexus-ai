import { axiosClient } from './axiosClient';

export interface CreatePrescriptionParams {
  patientId: number;
  diagnosisNotes: string;
  items: {
    medicineId: number;
    dosage: string;
    frequency: string;
    durationDays: number;
    instructions: string;
    timingSchedule: string;
    particularTime?: string;
  }[];
}

export const doctorApi = {
  getPatients: async () => {
    const res = await axiosClient.get('/doctor/patients');
    return res.data;
  },
  getMedicinesWithStock: async () => {
    const res = await axiosClient.get('/doctor/medicines');
    return res.data;
  },
  createPrescription: async (data: CreatePrescriptionParams) => {
    const res = await axiosClient.post('/doctor/prescriptions', data);
    return res.data;
  },
  getPrescriptions: async () => {
    const res = await axiosClient.get('/doctor/prescriptions');
    return res.data;
  },
};
