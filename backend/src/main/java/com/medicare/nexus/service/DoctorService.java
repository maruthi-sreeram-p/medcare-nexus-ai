package com.medicare.nexus.service;

import com.medicare.nexus.dto.DoctorDTOs.*;
import com.medicare.nexus.entity.*;
import com.medicare.nexus.exception.ResourceNotFoundException;
import com.medicare.nexus.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final MedicineRepository medicineRepository;
    private final InventoryRepository inventoryRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final MedicationLogRepository medicationLogRepository;
    private final GeminiAiService aiService;

    public DoctorService(PatientRepository patientRepository, DoctorRepository doctorRepository, MedicineRepository medicineRepository, InventoryRepository inventoryRepository, PrescriptionRepository prescriptionRepository, MedicationLogRepository medicationLogRepository, GeminiAiService aiService) {
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.medicineRepository = medicineRepository;
        this.inventoryRepository = inventoryRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.medicationLogRepository = medicationLogRepository;
        this.aiService = aiService;
    }

    public List<PatientSummaryResponse> getAllPatients() {
        return patientRepository.findAll().stream().map(p -> new PatientSummaryResponse(
                p.getId(),
                p.getUser().getId(),
                p.getUser().getFullName(),
                p.getUser().getEmail(),
                p.getUser().getPhone(),
                p.getGender(),
                p.getBloodGroup(),
                p.getAllergies(),
                p.getEmergencyContact()
        )).collect(Collectors.toList());
    }

    public List<MedicineOptionResponse> getMedicinesWithStockWarnings() {
        List<Medicine> medicines = medicineRepository.findAll();
        List<MedicineOptionResponse> responseList = new ArrayList<>();

        for (Medicine m : medicines) {
            Optional<Inventory> invOpt = inventoryRepository.findByMedicineId(m.getId());
            int stock = invOpt.map(Inventory::getStockQuantity).orElse(0);
            int reorder = invOpt.map(Inventory::getReorderLevel).orElse(10);
            String status = invOpt.map(Inventory::getStatus).orElse("OUT_OF_STOCK");

            String aiWarning = null;
            if (stock <= 0 || "OUT_OF_STOCK".equalsIgnoreCase(status)) {
                aiWarning = "AI ALERT: OUT OF STOCK! 0 units available in pharmacy.";
            } else if (stock <= reorder || "LOW_STOCK".equalsIgnoreCase(status)) {
                aiWarning = "AI WARNING: LOW STOCK! Only " + stock + " units remaining in pharmacy (Reorder threshold: " + reorder + ").";
            }

            responseList.add(new MedicineOptionResponse(
                    m.getId(),
                    m.getName(),
                    m.getGenericName(),
                    m.getUnit(),
                    stock,
                    status,
                    aiWarning
            ));
        }

        return responseList;
    }

    @Transactional
    public Prescription createPrescription(String doctorEmail, CreatePrescriptionRequest req) {
        Doctor doctor = doctorRepository.findByUserEmail(doctorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor profile not found for email: " + doctorEmail));

        Patient patient = patientRepository.findById(req.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + req.getPatientId()));

        Prescription rx = Prescription.builder()
                .doctor(doctor)
                .patient(patient)
                .diagnosisNotes(req.getDiagnosisNotes())
                .status("ACTIVE")
                .build();

        List<PrescriptionItem> items = new ArrayList<>();
        StringBuilder itemsSummaryBuilder = new StringBuilder();
        List<String> stockWarnings = new ArrayList<>();

        for (PrescriptionItemRequest itemReq : req.getItems()) {
            Medicine medicine = medicineRepository.findById(itemReq.getMedicineId())
                    .orElseThrow(() -> new ResourceNotFoundException("Medicine not found with ID: " + itemReq.getMedicineId()));

            int duration = itemReq.getDurationDays() != null && itemReq.getDurationDays() > 0 ? itemReq.getDurationDays() : 7;
            int frequencyMultiplier = parseFrequencyMultiplier(itemReq.getFrequency());
            int totalRequiredUnits = duration * frequencyMultiplier; // e.g. 7 days * 2 times daily = 14 units

            // Check Inventory & Stock Level for Exact Deduction!
            Optional<Inventory> invOpt = inventoryRepository.findByMedicineId(medicine.getId());
            if (invOpt.isPresent()) {
                Inventory inv = invOpt.get();
                int currentStock = inv.getStockQuantity();

                if (currentStock < totalRequiredUnits) {
                    stockWarnings.add("AI ALERT: Insufficient stock for " + medicine.getName() + "! Regimen requires " + totalRequiredUnits + " units (" + duration + " days × " + frequencyMultiplier + " doses/day), but pharmacy has only " + currentStock + " units available!");
                } else if ((currentStock - totalRequiredUnits) <= inv.getReorderLevel()) {
                    stockWarnings.add("AI WARNING: Prescribing " + totalRequiredUnits + " units of " + medicine.getName() + " reduces stock to " + (currentStock - totalRequiredUnits) + " units (Low Stock threshold: " + inv.getReorderLevel() + ").");
                }

                // Deduct total required units (e.g. 14 units) from inventory!
                int newStock = Math.max(0, currentStock - totalRequiredUnits);
                inv.setStockQuantity(newStock);
                if (newStock <= 0) {
                    inv.setStatus("OUT_OF_STOCK");
                } else if (newStock <= inv.getReorderLevel()) {
                    inv.setStatus("LOW_STOCK");
                } else {
                    inv.setStatus("IN_STOCK");
                }
                inventoryRepository.save(inv);
            }

            PrescriptionItem item = PrescriptionItem.builder()
                    .prescription(rx)
                    .medicine(medicine)
                    .dosage(itemReq.getDosage())
                    .frequency(itemReq.getFrequency())
                    .durationDays(duration)
                    .instructions(itemReq.getInstructions())
                    .timingSchedule(itemReq.getTimingSchedule())
                    .build();

            items.add(item);
            itemsSummaryBuilder.append(medicine.getName()).append(" (").append(itemReq.getDosage()).append(" for ").append(duration).append(" days, ").append(totalRequiredUnits).append(" total units), ");
        }

        rx.setItems(items);

        // Generate AI clinical summary using Gemini
        String baseAiSummary = aiService.summarizePrescriptionForDoctor(
                patient.getUser().getFullName(),
                req.getDiagnosisNotes(),
                itemsSummaryBuilder.toString()
        );

        // Prepend AI Stock Warnings if any stock calculation flagged issues
        if (!stockWarnings.isEmpty()) {
            String warningHeader = String.join("\n", stockWarnings);
            rx.setAiSummary(warningHeader + "\n\n" + baseAiSummary);
        } else {
            rx.setAiSummary(baseAiSummary);
        }

        Prescription savedRx = prescriptionRepository.save(rx);

        // Automatically create scheduled MedicationLog entries for the patient at the particular scheduled time
        for (int i = 0; i < savedRx.getItems().size(); i++) {
            PrescriptionItem item = savedRx.getItems().get(i);
            PrescriptionItemRequest itemReq = req.getItems().get(i);
            int duration = itemReq.getDurationDays() != null ? itemReq.getDurationDays() : 7;
            int freqMult = parseFrequencyMultiplier(itemReq.getFrequency());

            LocalTime scheduledTime = LocalTime.of(8, 0); // Default 08:00 AM
            if (itemReq.getParticularTime() != null && !itemReq.getParticularTime().trim().isEmpty()) {
                try {
                    String timeStr = itemReq.getParticularTime().trim();
                    if (timeStr.contains(":")) {
                        String[] parts = timeStr.split(":");
                        int hour = Integer.parseInt(parts[0].replaceAll("[^0-9]", ""));
                        int min = Integer.parseInt(parts[1].replaceAll("[^0-9]", ""));
                        if (timeStr.toUpperCase().contains("PM") && hour < 12) hour += 12;
                        if (timeStr.toUpperCase().contains("AM") && hour == 12) hour = 0;
                        scheduledTime = LocalTime.of(hour, min);
                    }
                } catch (Exception ignored) {}
            }

            LocalDateTime scheduledDateTime = LocalDateTime.of(LocalDate.now(), scheduledTime);

            MedicationLog log = MedicationLog.builder()
                    .patient(patient)
                    .prescriptionItem(item)
                    .scheduledTime(scheduledDateTime)
                    .status("PENDING")
                    .notes("Prescribed regimen: " + duration + " days (" + (duration * freqMult) + " total units) at scheduled time " + (itemReq.getParticularTime() != null ? itemReq.getParticularTime() : "08:00 AM"))
                    .build();

            medicationLogRepository.save(log);
        }

        return savedRx;
    }

    private int parseFrequencyMultiplier(String frequency) {
        if (frequency == null) return 2;
        String freqLower = frequency.toLowerCase();
        if (freqLower.contains("thrice") || freqLower.contains("3 times") || freqLower.contains("three")) return 3;
        if (freqLower.contains("four") || freqLower.contains("4 times")) return 4;
        if (freqLower.contains("once") || freqLower.contains("1 time") || freqLower.contains("single")) return 1;
        if (freqLower.contains("twice") || freqLower.contains("2 times") || freqLower.contains("two")) return 2;
        return 2;
    }

    public List<Prescription> getDoctorPrescriptions(String doctorEmail) {
        Doctor doctor = doctorRepository.findByUserEmail(doctorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor profile not found"));
        return prescriptionRepository.findByDoctorIdOrderByCreatedAtDesc(doctor.getId());
    }

    public Prescription getPrescriptionById(Long id) {
        return prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription not found with ID: " + id));
    }
}
