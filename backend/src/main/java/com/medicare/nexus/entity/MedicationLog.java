package com.medicare.nexus.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "medication_logs")
public class MedicationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "prescription_item_id", nullable = false)
    private PrescriptionItem prescriptionItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @Column(name = "scheduled_time", nullable = false)
    private LocalDateTime scheduledTime;

    @Column(length = 20)
    private String status = "PENDING";

    @Column(name = "taken_at")
    private LocalDateTime takenAt;

    @Column(columnDefinition = "TEXT")
    private String notes;

    public MedicationLog() {}

    public MedicationLog(Long id, PrescriptionItem prescriptionItem, Patient patient, LocalDateTime scheduledTime, String status, LocalDateTime takenAt, String notes) {
        this.id = id;
        this.prescriptionItem = prescriptionItem;
        this.patient = patient;
        this.scheduledTime = scheduledTime;
        this.status = status != null ? status : "PENDING";
        this.takenAt = takenAt;
        this.notes = notes;
    }

    public static MedicationLogBuilder builder() {
        return new MedicationLogBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public PrescriptionItem getPrescriptionItem() { return prescriptionItem; }
    public void setPrescriptionItem(PrescriptionItem prescriptionItem) { this.prescriptionItem = prescriptionItem; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public LocalDateTime getScheduledTime() { return scheduledTime; }
    public void setScheduledTime(LocalDateTime scheduledTime) { this.scheduledTime = scheduledTime; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getTakenAt() { return takenAt; }
    public void setTakenAt(LocalDateTime takenAt) { this.takenAt = takenAt; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public static class MedicationLogBuilder {
        private Long id;
        private PrescriptionItem prescriptionItem;
        private Patient patient;
        private LocalDateTime scheduledTime;
        private String status = "PENDING";
        private LocalDateTime takenAt;
        private String notes;

        public MedicationLogBuilder id(Long id) { this.id = id; return this; }
        public MedicationLogBuilder prescriptionItem(PrescriptionItem prescriptionItem) { this.prescriptionItem = prescriptionItem; return this; }
        public MedicationLogBuilder patient(Patient patient) { this.patient = patient; return this; }
        public MedicationLogBuilder scheduledTime(LocalDateTime scheduledTime) { this.scheduledTime = scheduledTime; return this; }
        public MedicationLogBuilder status(String status) { this.status = status; return this; }
        public MedicationLogBuilder takenAt(LocalDateTime takenAt) { this.takenAt = takenAt; return this; }
        public MedicationLogBuilder notes(String notes) { this.notes = notes; return this; }

        public MedicationLog build() {
            return new MedicationLog(id, prescriptionItem, patient, scheduledTime, status, takenAt, notes);
        }
    }
}
