package com.medicare.nexus.controller;

import com.medicare.nexus.dto.DoctorDTOs.*;
import com.medicare.nexus.entity.Prescription;
import com.medicare.nexus.service.DoctorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctor")
@PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
@Tag(name = "Doctor Portal", description = "Patient lookup, prescription creation with AI stock warnings, and doctor history")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping("/patients")
    @Operation(summary = "Get list of all registered patients")
    public ResponseEntity<List<PatientSummaryResponse>> getAllPatients() {
        return ResponseEntity.ok(doctorService.getAllPatients());
    }

    @GetMapping("/medicines")
    @Operation(summary = "Get available medicines with stock status and AI stock warnings")
    public ResponseEntity<List<MedicineOptionResponse>> getMedicinesWithStockWarnings() {
        return ResponseEntity.ok(doctorService.getMedicinesWithStockWarnings());
    }

    @PostMapping("/prescriptions")
    @Operation(summary = "Create a new prescription for a patient with auto-generated AI summary and stock alerts")
    public ResponseEntity<Prescription> createPrescription(Authentication authentication,
                                                           @RequestBody CreatePrescriptionRequest request) {
        return ResponseEntity.ok(doctorService.createPrescription(authentication.getName(), request));
    }

    @GetMapping("/prescriptions")
    @Operation(summary = "Get prescription history created by the doctor")
    public ResponseEntity<List<Prescription>> getDoctorPrescriptions(Authentication authentication) {
        return ResponseEntity.ok(doctorService.getDoctorPrescriptions(authentication.getName()));
    }

    @GetMapping("/prescriptions/{id}")
    @Operation(summary = "Get single prescription detail")
    public ResponseEntity<Prescription> getPrescriptionById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getPrescriptionById(id));
    }
}
