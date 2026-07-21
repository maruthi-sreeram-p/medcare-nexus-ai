package com.medicare.nexus.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "prescription_items")
public class PrescriptionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id", nullable = false)
    @JsonIgnore
    private Prescription prescription;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;

    @Column(nullable = false, length = 50)
    private String dosage;

    @Column(nullable = false, length = 50)
    private String frequency;

    @Column(name = "duration_days", nullable = false)
    private Integer durationDays;

    @Column(columnDefinition = "TEXT")
    private String instructions;

    @Column(name = "timing_schedule", length = 100)
    private String timingSchedule;

    public PrescriptionItem() {}

    public PrescriptionItem(Long id, Prescription prescription, Medicine medicine, String dosage, String frequency, Integer durationDays, String instructions, String timingSchedule) {
        this.id = id;
        this.prescription = prescription;
        this.medicine = medicine;
        this.dosage = dosage;
        this.frequency = frequency;
        this.durationDays = durationDays;
        this.instructions = instructions;
        this.timingSchedule = timingSchedule;
    }

    public static PrescriptionItemBuilder builder() {
        return new PrescriptionItemBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Prescription getPrescription() { return prescription; }
    public void setPrescription(Prescription prescription) { this.prescription = prescription; }

    public Medicine getMedicine() { return medicine; }
    public void setMedicine(Medicine medicine) { this.medicine = medicine; }

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

    public static class PrescriptionItemBuilder {
        private Long id;
        private Prescription prescription;
        private Medicine medicine;
        private String dosage;
        private String frequency;
        private Integer durationDays;
        private String instructions;
        private String timingSchedule;

        public PrescriptionItemBuilder id(Long id) { this.id = id; return this; }
        public PrescriptionItemBuilder prescription(Prescription prescription) { this.prescription = prescription; return this; }
        public PrescriptionItemBuilder medicine(Medicine medicine) { this.medicine = medicine; return this; }
        public PrescriptionItemBuilder dosage(String dosage) { this.dosage = dosage; return this; }
        public PrescriptionItemBuilder frequency(String frequency) { this.frequency = frequency; return this; }
        public PrescriptionItemBuilder durationDays(Integer durationDays) { this.durationDays = durationDays; return this; }
        public PrescriptionItemBuilder instructions(String instructions) { this.instructions = instructions; return this; }
        public PrescriptionItemBuilder timingSchedule(String timingSchedule) { this.timingSchedule = timingSchedule; return this; }

        public PrescriptionItem build() {
            return new PrescriptionItem(id, prescription, medicine, dosage, frequency, durationDays, instructions, timingSchedule);
        }
    }
}
