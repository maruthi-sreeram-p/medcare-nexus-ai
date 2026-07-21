package com.medicare.nexus.controller;

import com.medicare.nexus.dto.PatientDTOs.*;
import com.medicare.nexus.entity.Prescription;
import com.medicare.nexus.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patient")
@PreAuthorize("hasAnyRole('PATIENT', 'DOCTOR', 'ADMIN')")
@Tag(name = "Patient Portal", description = "Prescriptions list, medication schedule timeline, adherence tracking, and dose logs")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/prescriptions")
    @Operation(summary = "Get current patient's prescriptions")
    public ResponseEntity<List<Prescription>> getPatientPrescriptions(Authentication authentication) {
        return ResponseEntity.ok(patientService.getPatientPrescriptions(authentication.getName()));
    }

    @GetMapping("/schedule")
    @Operation(summary = "Get current patient's daily medication schedule")
    public ResponseEntity<List<ScheduleItemResponse>> getDailySchedule(Authentication authentication) {
        return ResponseEntity.ok(patientService.getDailySchedule(authentication.getName()));
    }

    @PostMapping("/medication-logs/{logId}/status")
    @Operation(summary = "Mark a scheduled medicine as TAKEN or MISSED")
    public ResponseEntity<ScheduleItemResponse> updateLogStatus(@PathVariable Long logId,
                                                                 @RequestBody Map<String, String> body) {
        String status = body.getOrDefault("status", "TAKEN");
        return ResponseEntity.ok(patientService.updateLogStatus(logId, status));
    }

    @GetMapping("/adherence")
    @Operation(summary = "Get patient adherence progress stats and streak score")
    public ResponseEntity<AdherenceStatsResponse> getAdherenceStats(Authentication authentication) {
        return ResponseEntity.ok(patientService.getAdherenceStats(authentication.getName()));
    }
}
