package com.medicare.nexus.service;

import com.medicare.nexus.dto.PatientDTOs.*;
import com.medicare.nexus.entity.*;
import com.medicare.nexus.exception.ResourceNotFoundException;
import com.medicare.nexus.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final MedicationLogRepository medicationLogRepository;

    public PatientService(PatientRepository patientRepository, PrescriptionRepository prescriptionRepository, MedicationLogRepository medicationLogRepository) {
        this.patientRepository = patientRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.medicationLogRepository = medicationLogRepository;
    }

    public List<Prescription> getPatientPrescriptions(String patientEmail) {
        Patient patient = patientRepository.findByUserEmail(patientEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));
        return prescriptionRepository.findByPatientIdOrderByCreatedAtDesc(patient.getId());
    }

    public List<ScheduleItemResponse> getDailySchedule(String patientEmail) {
        Patient patient = patientRepository.findByUserEmail(patientEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));

        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);

        List<MedicationLog> logs = medicationLogRepository.findByPatientIdAndScheduledTimeBetweenOrderByScheduledTimeAsc(
                patient.getId(), startOfDay, endOfDay);

        // Fallback: If no logs exist for today yet, return all medication logs for the patient
        if (logs.isEmpty()) {
            logs = medicationLogRepository.findByPatientIdOrderByScheduledTimeDesc(patient.getId());
        }

        return logs.stream().map(log -> new ScheduleItemResponse(
                log.getId(),
                log.getPrescriptionItem().getId(),
                log.getPrescriptionItem().getMedicine().getName(),
                log.getPrescriptionItem().getDosage(),
                log.getPrescriptionItem().getFrequency(),
                log.getPrescriptionItem().getInstructions(),
                log.getPrescriptionItem().getTimingSchedule(),
                log.getScheduledTime(),
                log.getStatus(),
                log.getTakenAt()
        )).collect(Collectors.toList());
    }

    @Transactional
    public ScheduleItemResponse updateLogStatus(Long logId, String status) {
        MedicationLog log = medicationLogRepository.findById(logId)
                .orElseThrow(() -> new ResourceNotFoundException("Medication log not found with ID: " + logId));

        log.setStatus(status.toUpperCase());
        if ("TAKEN".equalsIgnoreCase(status)) {
            log.setTakenAt(LocalDateTime.now());
        } else {
            log.setTakenAt(null);
        }

        MedicationLog updated = medicationLogRepository.save(log);

        return new ScheduleItemResponse(
                updated.getId(),
                updated.getPrescriptionItem().getId(),
                updated.getPrescriptionItem().getMedicine().getName(),
                updated.getPrescriptionItem().getDosage(),
                updated.getPrescriptionItem().getFrequency(),
                updated.getPrescriptionItem().getInstructions(),
                updated.getPrescriptionItem().getTimingSchedule(),
                updated.getScheduledTime(),
                updated.getStatus(),
                updated.getTakenAt()
        );
    }

    public AdherenceStatsResponse getAdherenceStats(String patientEmail) {
        Patient patient = patientRepository.findByUserEmail(patientEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));

        long taken = medicationLogRepository.countByPatientIdAndStatus(patient.getId(), "TAKEN");
        long missed = medicationLogRepository.countByPatientIdAndStatus(patient.getId(), "MISSED");
        long pending = medicationLogRepository.countByPatientIdAndStatus(patient.getId(), "PENDING");
        long total = taken + missed + pending;

        double percentage = total > 0 ? ((double) taken / total) * 100.0 : 100.0;
        int streak = taken > 0 ? (int) Math.min(taken, 14) : 0;

        return new AdherenceStatsResponse(total, taken, missed, pending, Math.round(percentage * 10.0) / 10.0, streak);
    }
}
