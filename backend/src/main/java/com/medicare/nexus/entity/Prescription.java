package com.medicare.nexus.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "prescriptions")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(name = "diagnosis_notes", columnDefinition = "TEXT")
    private String diagnosisNotes;

    @Column(length = 20)
    private String status = "ACTIVE";

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "ai_summary", columnDefinition = "TEXT")
    private String aiSummary;

    @OneToMany(mappedBy = "prescription", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<PrescriptionItem> items = new ArrayList<>();

    public Prescription() {}

    public Prescription(Long id, Patient patient, Doctor doctor, String diagnosisNotes, String status, LocalDateTime createdAt, String aiSummary, List<PrescriptionItem> items) {
        this.id = id;
        this.patient = patient;
        this.doctor = doctor;
        this.diagnosisNotes = diagnosisNotes;
        this.status = status != null ? status : "ACTIVE";
        this.createdAt = createdAt;
        this.aiSummary = aiSummary;
        this.items = items != null ? items : new ArrayList<>();
    }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    public static PrescriptionBuilder builder() {
        return new PrescriptionBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public String getDiagnosisNotes() { return diagnosisNotes; }
    public void setDiagnosisNotes(String diagnosisNotes) { this.diagnosisNotes = diagnosisNotes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getAiSummary() { return aiSummary; }
    public void setAiSummary(String aiSummary) { this.aiSummary = aiSummary; }

    public List<PrescriptionItem> getItems() { return items; }
    public void setItems(List<PrescriptionItem> items) { this.items = items; }

    public static class PrescriptionBuilder {
        private Long id;
        private Patient patient;
        private Doctor doctor;
        private String diagnosisNotes;
        private String status = "ACTIVE";
        private LocalDateTime createdAt;
        private String aiSummary;
        private List<PrescriptionItem> items = new ArrayList<>();

        public PrescriptionBuilder id(Long id) { this.id = id; return this; }
        public PrescriptionBuilder patient(Patient patient) { this.patient = patient; return this; }
        public PrescriptionBuilder doctor(Doctor doctor) { this.doctor = doctor; return this; }
        public PrescriptionBuilder diagnosisNotes(String diagnosisNotes) { this.diagnosisNotes = diagnosisNotes; return this; }
        public PrescriptionBuilder status(String status) { this.status = status; return this; }
        public PrescriptionBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public PrescriptionBuilder aiSummary(String aiSummary) { this.aiSummary = aiSummary; return this; }
        public PrescriptionBuilder items(List<PrescriptionItem> items) { this.items = items; return this; }

        public Prescription build() {
            return new Prescription(id, patient, doctor, diagnosisNotes, status, createdAt, aiSummary, items);
        }
    }
}
