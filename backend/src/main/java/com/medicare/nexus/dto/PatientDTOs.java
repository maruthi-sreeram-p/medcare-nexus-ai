package com.medicare.nexus.dto;

import java.time.LocalDateTime;

public class PatientDTOs {

    public static class ScheduleItemResponse {
        private Long logId;
        private Long prescriptionItemId;
        private String medicineName;
        private String dosage;
        private String frequency;
        private String instructions;
        private String timingSchedule;
        private LocalDateTime scheduledTime;
        private String status; // PENDING, TAKEN, MISSED
        private LocalDateTime takenAt;

        public ScheduleItemResponse() {}

        public ScheduleItemResponse(Long logId, Long prescriptionItemId, String medicineName, String dosage, String frequency, String instructions, String timingSchedule, LocalDateTime scheduledTime, String status, LocalDateTime takenAt) {
            this.logId = logId;
            this.prescriptionItemId = prescriptionItemId;
            this.medicineName = medicineName;
            this.dosage = dosage;
            this.frequency = frequency;
            this.instructions = instructions;
            this.timingSchedule = timingSchedule;
            this.scheduledTime = scheduledTime;
            this.status = status;
            this.takenAt = takenAt;
        }

        public Long getLogId() { return logId; }
        public void setLogId(Long logId) { this.logId = logId; }
        public Long getPrescriptionItemId() { return prescriptionItemId; }
        public void setPrescriptionItemId(Long prescriptionItemId) { this.prescriptionItemId = prescriptionItemId; }
        public String getMedicineName() { return medicineName; }
        public void setMedicineName(String medicineName) { this.medicineName = medicineName; }
        public String getDosage() { return dosage; }
        public void setDosage(String dosage) { this.dosage = dosage; }
        public String getFrequency() { return frequency; }
        public void setFrequency(String frequency) { this.frequency = frequency; }
        public String getInstructions() { return instructions; }
        public void setInstructions(String instructions) { this.instructions = instructions; }
        public String getTimingSchedule() { return timingSchedule; }
        public void setTimingSchedule(String timingSchedule) { this.timingSchedule = timingSchedule; }
        public LocalDateTime getScheduledTime() { return scheduledTime; }
        public void setScheduledTime(LocalDateTime scheduledTime) { this.scheduledTime = scheduledTime; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public LocalDateTime getTakenAt() { return takenAt; }
        public void setTakenAt(LocalDateTime takenAt) { this.takenAt = takenAt; }
    }

    public static class AdherenceStatsResponse {
        private long totalDoses;
        private long takenDoses;
        private long missedDoses;
        private long pendingDoses;
        private double adherencePercentage;
        private int currentStreakDays;

        public AdherenceStatsResponse() {}

        public AdherenceStatsResponse(long totalDoses, long takenDoses, long missedDoses, long pendingDoses, double adherencePercentage, int currentStreakDays) {
            this.totalDoses = totalDoses;
            this.takenDoses = takenDoses;
            this.missedDoses = missedDoses;
            this.pendingDoses = pendingDoses;
            this.adherencePercentage = adherencePercentage;
            this.currentStreakDays = currentStreakDays;
        }

        public long getTotalDoses() { return totalDoses; }
        public void setTotalDoses(long totalDoses) { this.totalDoses = totalDoses; }
        public long getTakenDoses() { return takenDoses; }
        public void setTakenDoses(long takenDoses) { this.takenDoses = takenDoses; }
        public long getMissedDoses() { return missedDoses; }
        public void setMissedDoses(long missedDoses) { this.missedDoses = missedDoses; }
        public long getPendingDoses() { return pendingDoses; }
        public void setPendingDoses(long pendingDoses) { this.pendingDoses = pendingDoses; }
        public double getAdherencePercentage() { return adherencePercentage; }
        public void setAdherencePercentage(double adherencePercentage) { this.adherencePercentage = adherencePercentage; }
        public int getCurrentStreakDays() { return currentStreakDays; }
        public void setCurrentStreakDays(int currentStreakDays) { this.currentStreakDays = currentStreakDays; }
    }
}
