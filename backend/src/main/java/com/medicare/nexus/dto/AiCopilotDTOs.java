package com.medicare.nexus.dto;

import java.util.List;

public class AiCopilotDTOs {

    public static class DoctorAiAnalysisRequest {
        private String patientName;
        private String diagnosis;
        private List<String> medicines;
        private String instructions;
        private String language;

        public DoctorAiAnalysisRequest() {}

        public DoctorAiAnalysisRequest(String patientName, String diagnosis, List<String> medicines, String instructions, String language) {
            this.patientName = patientName;
            this.diagnosis = diagnosis;
            this.medicines = medicines;
            this.instructions = instructions;
            this.language = language;
        }

        public String getPatientName() { return patientName; }
        public void setPatientName(String patientName) { this.patientName = patientName; }
        public String getDiagnosis() { return diagnosis; }
        public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }
        public List<String> getMedicines() { return medicines; }
        public void setMedicines(List<String> medicines) { this.medicines = medicines; }
        public String getInstructions() { return instructions; }
        public void setInstructions(String instructions) { this.instructions = instructions; }
        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }
    }

    public static class DoctorAiAnalysisResponse {
        private String summary;
        private List<String> medicinesExplained;
        private List<String> duplicateWarnings;
        private List<String> drugInteractions;
        private List<String> sideEffects;
        private List<String> precautions;
        private String patientInstructions;
        private String timingSchedule;
        private int confidenceScore;
        private String safetyBadge;

        public DoctorAiAnalysisResponse() {}

        public DoctorAiAnalysisResponse(String summary, List<String> medicinesExplained, List<String> duplicateWarnings, List<String> drugInteractions, List<String> sideEffects, List<String> precautions, String patientInstructions, String timingSchedule, int confidenceScore, String safetyBadge) {
            this.summary = summary;
            this.medicinesExplained = medicinesExplained;
            this.duplicateWarnings = duplicateWarnings;
            this.drugInteractions = drugInteractions;
            this.sideEffects = sideEffects;
            this.precautions = precautions;
            this.patientInstructions = patientInstructions;
            this.timingSchedule = timingSchedule;
            this.confidenceScore = confidenceScore;
            this.safetyBadge = safetyBadge;
        }

        public String getSummary() { return summary; }
        public void setSummary(String summary) { this.summary = summary; }
        public List<String> getMedicinesExplained() { return medicinesExplained; }
        public void setMedicinesExplained(List<String> medicinesExplained) { this.medicinesExplained = medicinesExplained; }
        public List<String> getDuplicateWarnings() { return duplicateWarnings; }
        public void setDuplicateWarnings(List<String> duplicateWarnings) { this.duplicateWarnings = duplicateWarnings; }
        public List<String> getDrugInteractions() { return drugInteractions; }
        public void setDrugInteractions(List<String> drugInteractions) { this.drugInteractions = drugInteractions; }
        public List<String> getSideEffects() { return sideEffects; }
        public void setSideEffects(List<String> sideEffects) { this.sideEffects = sideEffects; }
        public List<String> getPrecautions() { return precautions; }
        public void setPrecautions(List<String> precautions) { this.precautions = precautions; }
        public String getPatientInstructions() { return patientInstructions; }
        public void setPatientInstructions(String patientInstructions) { this.patientInstructions = patientInstructions; }
        public String getTimingSchedule() { return timingSchedule; }
        public void setTimingSchedule(String timingSchedule) { this.timingSchedule = timingSchedule; }
        public int getConfidenceScore() { return confidenceScore; }
        public void setConfidenceScore(int confidenceScore) { this.confidenceScore = confidenceScore; }
        public String getSafetyBadge() { return safetyBadge; }
        public void setSafetyBadge(String safetyBadge) { this.safetyBadge = safetyBadge; }
    }

    public static class PatientAiSummaryResponse {
        private String greeting;
        private String whyPrescribed;
        private String howToTake;
        private String foodInstructions;
        private List<String> commonSideEffects;
        private List<String> lifestylePrecautions;
        private String missedDoseAction;
        private String dailyHealthSummary;
        private int adherenceScore;

        public PatientAiSummaryResponse() {}

        public PatientAiSummaryResponse(String greeting, String whyPrescribed, String howToTake, String foodInstructions, List<String> commonSideEffects, List<String> lifestylePrecautions, String missedDoseAction, String dailyHealthSummary, int adherenceScore) {
            this.greeting = greeting;
            this.whyPrescribed = whyPrescribed;
            this.howToTake = howToTake;
            this.foodInstructions = foodInstructions;
            this.commonSideEffects = commonSideEffects;
            this.lifestylePrecautions = lifestylePrecautions;
            this.missedDoseAction = missedDoseAction;
            this.dailyHealthSummary = dailyHealthSummary;
            this.adherenceScore = adherenceScore;
        }

        public String getGreeting() { return greeting; }
        public void setGreeting(String greeting) { this.greeting = greeting; }
        public String getWhyPrescribed() { return whyPrescribed; }
        public void setWhyPrescribed(String whyPrescribed) { this.whyPrescribed = whyPrescribed; }
        public String getHowToTake() { return howToTake; }
        public void setHowToTake(String howToTake) { this.howToTake = howToTake; }
        public String getFoodInstructions() { return foodInstructions; }
        public void setFoodInstructions(String foodInstructions) { this.foodInstructions = foodInstructions; }
        public List<String> getCommonSideEffects() { return commonSideEffects; }
        public void setCommonSideEffects(List<String> commonSideEffects) { this.commonSideEffects = commonSideEffects; }
        public List<String> getLifestylePrecautions() { return lifestylePrecautions; }
        public void setLifestylePrecautions(List<String> lifestylePrecautions) { this.lifestylePrecautions = lifestylePrecautions; }
        public String getMissedDoseAction() { return missedDoseAction; }
        public void setMissedDoseAction(String missedDoseAction) { this.missedDoseAction = missedDoseAction; }
        public String getDailyHealthSummary() { return dailyHealthSummary; }
        public void setDailyHealthSummary(String dailyHealthSummary) { this.dailyHealthSummary = dailyHealthSummary; }
        public int getAdherenceScore() { return adherenceScore; }
        public void setAdherenceScore(int adherenceScore) { this.adherenceScore = adherenceScore; }
    }

    public static class StaffInventoryAiResponse {
        private String executiveStockSummary;
        private List<String> lowStockPredictions;
        private List<String> depletionEstimates;
        private List<String> expiryWarnings;
        private List<String> recommendedPurchases;
        private List<String> highestConsumedMedicines;
        private String restockingPriority;

        public StaffInventoryAiResponse() {}

        public StaffInventoryAiResponse(String executiveStockSummary, List<String> lowStockPredictions, List<String> depletionEstimates, List<String> expiryWarnings, List<String> recommendedPurchases, List<String> highestConsumedMedicines, String restockingPriority) {
            this.executiveStockSummary = executiveStockSummary;
            this.lowStockPredictions = lowStockPredictions;
            this.depletionEstimates = depletionEstimates;
            this.expiryWarnings = expiryWarnings;
            this.recommendedPurchases = recommendedPurchases;
            this.highestConsumedMedicines = highestConsumedMedicines;
            this.restockingPriority = restockingPriority;
        }

        public String getExecutiveStockSummary() { return executiveStockSummary; }
        public void setExecutiveStockSummary(String executiveStockSummary) { this.executiveStockSummary = executiveStockSummary; }
        public List<String> getLowStockPredictions() { return lowStockPredictions; }
        public void setLowStockPredictions(List<String> lowStockPredictions) { this.lowStockPredictions = lowStockPredictions; }
        public List<String> getDepletionEstimates() { return depletionEstimates; }
        public void setDepletionEstimates(List<String> depletionEstimates) { this.depletionEstimates = depletionEstimates; }
        public List<String> getExpiryWarnings() { return expiryWarnings; }
        public void setExpiryWarnings(List<String> expiryWarnings) { this.expiryWarnings = expiryWarnings; }
        public List<String> getRecommendedPurchases() { return recommendedPurchases; }
        public void setRecommendedPurchases(List<String> recommendedPurchases) { this.recommendedPurchases = recommendedPurchases; }
        public List<String> getHighestConsumedMedicines() { return highestConsumedMedicines; }
        public void setHighestConsumedMedicines(List<String> highestConsumedMedicines) { this.highestConsumedMedicines = highestConsumedMedicines; }
        public String getRestockingPriority() { return restockingPriority; }
        public void setRestockingPriority(String restockingPriority) { this.restockingPriority = restockingPriority; }
    }

    public static class AdminExecutiveAiResponse {
        private String executiveSummary;
        private String hospitalActivityOverview;
        private String usageTrends;
        private List<String> patientAdherenceWatchlist;
        private List<String> inventoryAlerts;
        private String systemHealthStatus;

        public AdminExecutiveAiResponse() {}

        public AdminExecutiveAiResponse(String executiveSummary, String hospitalActivityOverview, String usageTrends, List<String> patientAdherenceWatchlist, List<String> inventoryAlerts, String systemHealthStatus) {
            this.executiveSummary = executiveSummary;
            this.hospitalActivityOverview = hospitalActivityOverview;
            this.usageTrends = usageTrends;
            this.patientAdherenceWatchlist = patientAdherenceWatchlist;
            this.inventoryAlerts = inventoryAlerts;
            this.systemHealthStatus = systemHealthStatus;
        }

        public String getExecutiveSummary() { return executiveSummary; }
        public void setExecutiveSummary(String executiveSummary) { this.executiveSummary = executiveSummary; }
        public String getHospitalActivityOverview() { return hospitalActivityOverview; }
        public void setHospitalActivityOverview(String hospitalActivityOverview) { this.hospitalActivityOverview = hospitalActivityOverview; }
        public String getUsageTrends() { return usageTrends; }
        public void setUsageTrends(String usageTrends) { this.usageTrends = usageTrends; }
        public List<String> getPatientAdherenceWatchlist() { return patientAdherenceWatchlist; }
        public void setPatientAdherenceWatchlist(List<String> patientAdherenceWatchlist) { this.patientAdherenceWatchlist = patientAdherenceWatchlist; }
        public List<String> getInventoryAlerts() { return inventoryAlerts; }
        public void setInventoryAlerts(List<String> inventoryAlerts) { this.inventoryAlerts = inventoryAlerts; }
        public String getSystemHealthStatus() { return systemHealthStatus; }
        public void setSystemHealthStatus(String systemHealthStatus) { this.systemHealthStatus = systemHealthStatus; }
    }

    public static class AiQuestionRequest {
        private String question;
        private String context;
        private String language;

        public AiQuestionRequest() {}
        public AiQuestionRequest(String question, String context, String language) {
            this.question = question;
            this.context = context;
            this.language = language;
        }
        public String getQuestion() { return question; }
        public void setQuestion(String question) { this.question = question; }
        public String getContext() { return context; }
        public void setContext(String context) { this.context = context; }
        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }
    }
}
