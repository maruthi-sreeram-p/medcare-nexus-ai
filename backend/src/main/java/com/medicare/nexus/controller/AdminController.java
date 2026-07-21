package com.medicare.nexus.controller;

import com.medicare.nexus.dto.AdminDTOs.*;
import com.medicare.nexus.entity.Medicine;
import com.medicare.nexus.entity.User;
import com.medicare.nexus.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Portal", description = "System metrics analytics, user management, and platform configuration")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/stats")
    @Operation(summary = "Get platform metrics and analytics statistics")
    public ResponseEntity<AdminStatsResponse> getSystemStats() {
        return ResponseEntity.ok(adminService.getSystemStats());
    }

    @GetMapping("/users")
    @Operation(summary = "List all platform users across roles")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PutMapping("/users/{id}/status")
    @Operation(summary = "Update user status (ACTIVE / INACTIVE)")
    public ResponseEntity<User> updateUserStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.getOrDefault("status", "ACTIVE");
        return ResponseEntity.ok(adminService.updateUserStatus(id, status));
    }

    @GetMapping("/medicines")
    @Operation(summary = "Get medicine master catalog")
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        return ResponseEntity.ok(adminService.getAllMedicines());
    }
}
