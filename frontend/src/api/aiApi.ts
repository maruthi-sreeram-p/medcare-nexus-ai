import { axiosClient } from './axiosClient';

export interface DoctorAiAnalysisRequest {
  patientName: string;
  diagnosis: string;
  medicines: string[];
  instructions: string;
  language?: string;
}

export interface DoctorAiAnalysisResponse {
  summary: string;
  medicinesExplained: string[];
  duplicateWarnings: string[];
  drugInteractions: string[];
  sideEffects: string[];
  precautions: string[];
  patientInstructions: string;
  timingSchedule: string;
  confidenceScore: number;
  safetyBadge: string;
}

export interface PatientAiSummaryResponse {
  greeting: string;
  whyPrescribed: string;
  howToTake: string;
  foodInstructions: string;
  commonSideEffects: string[];
  lifestylePrecautions: string[];
  missedDoseAction: string;
  dailyHealthSummary: string;
  adherenceScore: number;
}

export interface StaffInventoryAiResponse {
  executiveStockSummary: string;
  lowStockPredictions: string[];
  depletionEstimates: string[];
  expiryWarnings: string[];
  recommendedPurchases: string[];
  highestConsumedMedicines: string[];
  restockingPriority: string;
}

export interface AdminExecutiveAiResponse {
  executiveSummary: string;
  hospitalActivityOverview: string;
  usageTrends: string;
  patientAdherenceWatchlist: string[];
  inventoryAlerts: string[];
  systemHealthStatus: string;
}

export const aiApi = {
  analyzeDoctorPrescription: async (data: DoctorAiAnalysisRequest): Promise<DoctorAiAnalysisResponse> => {
    const res = await axiosClient.post('/ai/doctor-analysis', data);
    return res.data;
  },

  getPatientDailySummary: async (patientName?: string, diagnosis?: string, medicineSummary?: string, language?: string): Promise<PatientAiSummaryResponse> => {
    const res = await axiosClient.post('/ai/patient-summary', { patientName, diagnosis, medicineSummary, language });
    return res.data;
  },

  getInventoryAiInsights: async (): Promise<StaffInventoryAiResponse> => {
    const res = await axiosClient.post('/ai/inventory-insights');
    return res.data;
  },

  getAdminExecutiveSummary: async (): Promise<AdminExecutiveAiResponse> => {
    const res = await axiosClient.get('/ai/admin-executive-summary');
    return res.data;
  },

  askContextQuestion: async (question: string, context: string, language?: string): Promise<{ answer: string }> => {
    const res = await axiosClient.post('/ai/context-question', { question, context, language });
    return res.data;
  },

  explainMedicine: async (medicineName: string) => {
    const res = await axiosClient.post('/ai/explain-medicine', { medicineName });
    return res.data;
  },
  explainPrescription: async (diagnosis: string, items: string) => {
    const res = await axiosClient.post('/ai/explain-prescription', { diagnosis, items });
    return res.data;
  },
  checkInteractions: async (medicines: string[]) => {
    const res = await axiosClient.post('/ai/check-interactions', { medicines });
    return res.data;
  },
};
