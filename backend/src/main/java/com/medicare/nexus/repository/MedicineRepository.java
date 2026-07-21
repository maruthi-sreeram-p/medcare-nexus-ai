package com.medicare.nexus.repository;

import com.medicare.nexus.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    List<Medicine> findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCase(String name, String genericName);
}
