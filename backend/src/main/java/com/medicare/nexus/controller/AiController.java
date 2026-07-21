package com.medicare.nexus.controller;

import com.medicare.nexus.dto.AiCopilotDTOs.*;
import com.medicare.nexus.service.AdminService;
import com.medicare.nexus.service.GeminiAiService;
import com.medicare.nexus.service.StaffService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ai")
@Tag(name = "AI Copilot Engine", description = "Role-based AI Copilot endpoints for Doctor, Patient, Staff, and Admin")
public class AiController {

    private final GeminiAiService aiService;
    private final StaffService staffService;
    private final AdminService adminService;

    public AiController(GeminiAiService aiService, StaffService staffService, AdminService adminService) {
        this.aiService = aiService;
        this.staffService = staffService;
        this.adminService = adminService;
    }

    @PostMapping("/doctor-analysis")
    @Operation(summary = "Automatic clinical prescription analysis for Doctors")
    public ResponseEntity<DoctorAiAnalysisResponse> analyzeDoctorPrescription(@RequestBody DoctorAiAnalysisRequest request) {
        DoctorAiAnalysisResponse response = aiService.analyzePrescriptionForDoctor(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/patient-summary")
    @Operation(summary = "Automatic daily medication guidance summary for Patients")
    public ResponseEntity<PatientAiSummaryResponse> getPatientDailySummary(@RequestBody Map<String, String> request) {
        String patientName = request.getOrDefault("patientName", "John Doe");
        String diagnosis = request.getOrDefault("diagnosis", "Acute Bronchitis");
        String medicineSummary = request.getOrDefault("medicineSummary", "Amoxicillin 500mg, Paracetamol 500mg");
        String language = request.getOrDefault("language", "English");
        PatientAiSummaryResponse response = aiService.getPatientDailyAiSummary(patientName, diagnosis, medicineSummary, language);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/inventory-insights")
    @Operation(summary = "Predictive inventory stock depletion and restocking AI insights for Staff")
    public ResponseEntity<StaffInventoryAiResponse> getInventoryAiInsights() {
        List<String> itemsWithStock = staffService.getAllInventory().stream()
                .map(i -> i.getMedicine().getName() + " - Stock: " + i.getStockQuantity() + " units (Reorder: " + i.getReorderLevel() + ")")
                .collect(Collectors.toList());

        if (itemsWithStock.isEmpty()) {
            itemsWithStock = List.of(
                "Amoxicillin 500mg - Stock: 14 units (Reorder: 15)",
                "Paracetamol 500mg - Stock: 120 units (Reorder: 20)",
                "Ibuprofen 400mg - Stock: 8 units (Reorder: 10)"
            );
        }

        StaffInventoryAiResponse response = aiService.getStaffInventoryAiInsights(itemsWithStock);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin-executive-summary")
    @Operation(summary = "Executive AI Summary dashboard card for Administrators")
    public ResponseEntity<AdminExecutiveAiResponse> getAdminExecutiveSummary() {
        var stats = adminService.getSystemStats();
        AdminExecutiveAiResponse response = aiService.getAdminExecutiveAiSummary(
                stats.getTotalUsers(),
                stats.getActivePrescriptions(),
                stats.getLowStockCount()
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/context-question")
    @Operation(summary = "Instant contextual Q&A for Patients in preferred language")
    public ResponseEntity<Map<String, String>> askContextQuestion(@RequestBody AiQuestionRequest request) {
        String answer = aiService.answerPatientContextQuestion(request.getQuestion(), request.getContext(), request.getLanguage());
        return ResponseEntity.ok(Map.of("answer", answer));
    }

    @PostMapping("/explain-medicine")
    public ResponseEntity<Map<String, String>> explainMedicine(@RequestBody Map<String, String> request) {
        String medicineName = request.getOrDefault("medicineName", "Amoxicillin");
        String explanation = aiService.explainMedicine(medicineName);
        return ResponseEntity.ok(Map.of("explanation", explanation));
    }

    @PostMapping("/explain-prescription")
    public ResponseEntity<Map<String, String>> explainPrescription(@RequestBody Map<String, String> request) {
        String diagnosis = request.getOrDefault("diagnosis", "Upper Respiratory Infection");
        String items = request.getOrDefault("items", "Amoxicillin 500mg, Paracetamol 500mg");
        String explanation = aiService.explainPrescription(diagnosis, items);
        return ResponseEntity.ok(Map.of("explanation", explanation));
    }

    @PostMapping("/check-interactions")
    public ResponseEntity<Map<String, List<String>>> checkInteractions(@RequestBody Map<String, List<String>> request) {
        List<String> medicines = request.getOrDefault("medicines", List.of("Amoxicillin", "Ibuprofen"));
        String analysis = aiService.checkInteractions(medicines);
        return ResponseEntity.ok(Map.of("analysis", List.of(analysis)));
    }
}
