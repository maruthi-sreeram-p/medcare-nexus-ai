package com.medicare.nexus.repository;

import com.medicare.nexus.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findByMedicineId(Long medicineId);
    
    @Query("SELECT i FROM Inventory i WHERE i.stockQuantity <= i.reorderLevel")
    List<Inventory> findLowStockItems();
}
