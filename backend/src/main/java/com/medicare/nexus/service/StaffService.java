package com.medicare.nexus.service;

import com.medicare.nexus.dto.StaffDTOs.*;
import com.medicare.nexus.entity.*;
import com.medicare.nexus.exception.ResourceNotFoundException;
import com.medicare.nexus.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StaffService {

    private final InventoryRepository inventoryRepository;
    private final MedicineRepository medicineRepository;

    public StaffService(InventoryRepository inventoryRepository, MedicineRepository medicineRepository) {
        this.inventoryRepository = inventoryRepository;
        this.medicineRepository = medicineRepository;
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public List<Inventory> getLowStockItems() {
        return inventoryRepository.findLowStockItems();
    }

    @Transactional
    public Inventory addMedicineWithInventory(AddMedicineRequest req) {
        Medicine medicine = medicineRepository.save(Medicine.builder()
                .name(req.getName())
                .genericName(req.getGenericName())
                .manufacturer(req.getManufacturer())
                .category(req.getCategory())
                .dosageForm(req.getDosageForm())
                .unit(req.getUnit())
                .description(req.getDescription())
                .build());

        String status = "IN_STOCK";
        int qty = req.getInitialStock() != null ? req.getInitialStock() : 0;
        int reorder = req.getReorderLevel() != null ? req.getReorderLevel() : 10;
        if (qty <= 0) {
            status = "OUT_OF_STOCK";
        } else if (qty <= reorder) {
            status = "LOW_STOCK";
        }

        Inventory inventory = Inventory.builder()
                .medicine(medicine)
                .stockQuantity(qty)
                .reorderLevel(reorder)
                .pricePerUnit(req.getPricePerUnit())
                .batchNumber(req.getBatchNumber())
                .expiryDate(req.getExpiryDate())
                .status(status)
                .build();

        return inventoryRepository.save(inventory);
    }

    @Transactional
    public Inventory updateStockLevel(Long inventoryId, UpdateStockRequest req) {
        Inventory inv = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory record not found with ID: " + inventoryId));

        if (req.getNewQuantity() != null) {
            inv.setStockQuantity(req.getNewQuantity());
        }
        if (req.getReorderLevel() != null) {
            inv.setReorderLevel(req.getReorderLevel());
        }

        if (inv.getStockQuantity() <= 0) {
            inv.setStatus("OUT_OF_STOCK");
        } else if (inv.getStockQuantity() <= inv.getReorderLevel()) {
            inv.setStatus("LOW_STOCK");
        } else {
            inv.setStatus("IN_STOCK");
        }

        return inventoryRepository.save(inv);
    }
}
