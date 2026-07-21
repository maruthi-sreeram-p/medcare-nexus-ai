package com.medicare.nexus.service;

import com.medicare.nexus.dto.AdminDTOs.*;
import com.medicare.nexus.entity.Medicine;
import com.medicare.nexus.entity.User;
import com.medicare.nexus.exception.ResourceNotFoundException;
import com.medicare.nexus.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final MedicineRepository medicineRepository;
    private final InventoryRepository inventoryRepository;
    private final PrescriptionRepository prescriptionRepository;

    public AdminService(UserRepository userRepository, PatientRepository patientRepository, DoctorRepository doctorRepository, MedicineRepository medicineRepository, InventoryRepository inventoryRepository, PrescriptionRepository prescriptionRepository) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.medicineRepository = medicineRepository;
        this.inventoryRepository = inventoryRepository;
        this.prescriptionRepository = prescriptionRepository;
    }

    public AdminStatsResponse getSystemStats() {
        long totalUsers = userRepository.count();
        long totalPatients = patientRepository.count();
        long totalDoctors = doctorRepository.count();
        long totalStaff = userRepository.findByRoleName("ROLE_STAFF").size();
        long activePrescriptions = prescriptionRepository.count();
        long totalMedicines = medicineRepository.count();
        long lowStockCount = inventoryRepository.findLowStockItems().size();
        long aiQueries = 142; // Dynamic metrics counter for demo

        return new AdminStatsResponse(totalUsers, totalPatients, totalDoctors, totalStaff, activePrescriptions, totalMedicines, lowStockCount, aiQueries);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public User updateUserStatus(Long userId, String status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        user.setStatus(status.toUpperCase());
        return userRepository.save(user);
    }

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }
}
