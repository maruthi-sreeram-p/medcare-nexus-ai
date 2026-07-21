package com.medicare.nexus.dto;

public class AdminDTOs {

    public static class AdminStatsResponse {
        private long totalUsers;
        private long totalPatients;
        private long totalDoctors;
        private long totalStaff;
        private long activePrescriptions;
        private long totalMedicines;
        private long lowStockCount;
        private long aiAssistantQueries;

        public AdminStatsResponse() {}

        public AdminStatsResponse(long totalUsers, long totalPatients, long totalDoctors, long totalStaff, long activePrescriptions, long totalMedicines, long lowStockCount, long aiAssistantQueries) {
            this.totalUsers = totalUsers;
            this.totalPatients = totalPatients;
            this.totalDoctors = totalDoctors;
            this.totalStaff = totalStaff;
            this.activePrescriptions = activePrescriptions;
            this.totalMedicines = totalMedicines;
            this.lowStockCount = lowStockCount;
            this.aiAssistantQueries = aiAssistantQueries;
        }

        public long getTotalUsers() { return totalUsers; }
        public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }
        public long getTotalPatients() { return totalPatients; }
        public void setTotalPatients(long totalPatients) { this.totalPatients = totalPatients; }
        public long getTotalDoctors() { return totalDoctors; }
        public void setTotalDoctors(long totalDoctors) { this.totalDoctors = totalDoctors; }
        public long getTotalStaff() { return totalStaff; }
        public void setTotalStaff(long totalStaff) { this.totalStaff = totalStaff; }
        public long getActivePrescriptions() { return activePrescriptions; }
        public void setActivePrescriptions(long activePrescriptions) { this.activePrescriptions = activePrescriptions; }
        public long getTotalMedicines() { return totalMedicines; }
        public void setTotalMedicines(long totalMedicines) { this.totalMedicines = totalMedicines; }
        public long getLowStockCount() { return lowStockCount; }
        public void setLowStockCount(long lowStockCount) { this.lowStockCount = lowStockCount; }
        public long getAiAssistantQueries() { return aiAssistantQueries; }
        public void setAiAssistantQueries(long aiAssistantQueries) { this.aiAssistantQueries = aiAssistantQueries; }
    }
}
