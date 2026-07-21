package com.medicare.nexus.controller;

import com.medicare.nexus.dto.StaffDTOs.*;
import com.medicare.nexus.entity.Inventory;
import com.medicare.nexus.service.StaffService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
@Tag(name = "Staff Portal", description = "Pharmacy stock inventory, adding new medicines, updating quantities, and low stock alerts")
public class StaffController {

    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @GetMapping("/inventory")
    @Operation(summary = "Get medicine inventory list")
    public ResponseEntity<List<Inventory>> getAllInventory() {
        return ResponseEntity.ok(staffService.getAllInventory());
    }

    @GetMapping("/inventory/low-stock")
    @Operation(summary = "Get low stock inventory items requiring reorder")
    public ResponseEntity<List<Inventory>> getLowStockItems() {
        return ResponseEntity.ok(staffService.getLowStockItems());
    }

    @PostMapping("/medicines")
    @Operation(summary = "Add new medicine and create inventory entry")
    public ResponseEntity<Inventory> addMedicine(@RequestBody AddMedicineRequest request) {
        return ResponseEntity.ok(staffService.addMedicineWithInventory(request));
    }

    @PutMapping("/inventory/{id}")
    @Operation(summary = "Update stock quantity and reorder level")
    public ResponseEntity<Inventory> updateStock(@PathVariable Long id, @RequestBody UpdateStockRequest request) {
        return ResponseEntity.ok(staffService.updateStockLevel(id, request));
    }
}
