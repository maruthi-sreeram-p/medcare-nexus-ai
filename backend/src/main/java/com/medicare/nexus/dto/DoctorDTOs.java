package com.medicare.nexus.dto;

import java.util.List;

public class DoctorDTOs {

    public static class PatientSummaryResponse {
        private Long id;
        private Long userId;
        private String fullName;
        private String email;
        private String phone;
        private String gender;
        private String bloodGroup;
        private String allergies;
        private String emergencyContact;

        public PatientSummaryResponse() {}

        public PatientSummaryResponse(Long id, Long userId, String fullName, String email, String phone, String gender, String bloodGroup, String allergies, String emergencyContact) {
            this.id = id;
            this.userId = userId;
            this.fullName = fullName;
            this.email = email;
            this.phone = phone;
            this.gender = gender;
            this.bloodGroup = bloodGroup;
            this.allergies = allergies;
            this.emergencyContact = emergencyContact;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        public String getGender() { return gender; }
        public void setGender(String gender) { this.gender = gender; }
        public String getBloodGroup() { return bloodGroup; }
        public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }
        public String getAllergies() { return allergies; }
        public void setAllergies(String allergies) { this.allergies = allergies; }
        public String getEmergencyContact() { return emergencyContact; }
        public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }
    }

    public static class MedicineOptionResponse {
        private Long id;
        private String name;
        private String genericName;
        private String unit;
        private Integer stockQuantity;
        private String stockStatus;
        private String aiWarning;

        public MedicineOptionResponse() {}

        public MedicineOptionResponse(Long id, String name, String genericName, String unit, Integer stockQuantity, String stockStatus, String aiWarning) {
            this.id = id;
            this.name = name;
            this.genericName = genericName;
            this.unit = unit;
            this.stockQuantity = stockQuantity;
            this.stockStatus = stockStatus;
            this.aiWarning = aiWarning;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getGenericName() { return genericName; }
        public void setGenericName(String genericName) { this.genericName = genericName; }
        public String getUnit() { return unit; }
        public void setUnit(String unit) { this.unit = unit; }
        public Integer getStockQuantity() { return stockQuantity; }
        public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
        public String getStockStatus() { return stockStatus; }
        public void setStockStatus(String stockStatus) { this.stockStatus = stockStatus; }
        public String getAiWarning() { return aiWarning; }
        public void setAiWarning(String aiWarning) { this.aiWarning = aiWarning; }
    }

    public static class PrescriptionItemRequest {
        private Long medicineId;
        private String dosage;
        private String frequency;
        private Integer durationDays;
        private String instructions;
        private String timingSchedule;
        private String particularTime; // e.g. "08:00 AM", "02:00 PM", "20:00"

        public PrescriptionItemRequest() {}

        public Long getMedicineId() { return medicineId; }
        public void setMedicineId(Long medicineId) { this.medicineId = medicineId; }
        public String getDosage() { return dosage; }
        public void setDosage(String dosage) { this.dosage = dosage; }
        public String getFrequency() { return frequency; }
        public void setFrequency(String frequency) { this.frequency = frequency; }
        public Integer getDurationDays() { return durationDays; }
        public void setDurationDays(Integer durationDays) { this.durationDays = durationDays; }
        public String getInstructions() { return instructions; }
        public void setInstructions(String instructions) { this.instructions = instructions; }
        public String getTimingSchedule() { return timingSchedule; }
        public void setTimingSchedule(String timingSchedule) { this.timingSchedule = timingSchedule; }
        public String getParticularTime() { return particularTime; }
        public void setParticularTime(String particularTime) { this.particularTime = particularTime; }
    }

    public static class CreatePrescriptionRequest {
        private Long patientId;
        private String diagnosisNotes;
        private List<PrescriptionItemRequest> items;

        public CreatePrescriptionRequest() {}

        public Long getPatientId() { return patientId; }
        public void setPatientId(Long patientId) { this.patientId = patientId; }
        public String getDiagnosisNotes() { return diagnosisNotes; }
        public void setDiagnosisNotes(String diagnosisNotes) { this.diagnosisNotes = diagnosisNotes; }
        public List<PrescriptionItemRequest> getItems() { return items; }
        public void setItems(List<PrescriptionItemRequest> items) { this.items = items; }
    }
}
