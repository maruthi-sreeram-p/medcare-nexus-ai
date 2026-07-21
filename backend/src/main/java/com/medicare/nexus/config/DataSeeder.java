package com.medicare.nexus.config;

import com.medicare.nexus.entity.*;
import com.medicare.nexus.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final MedicineRepository medicineRepository;
    private final InventoryRepository inventoryRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final MedicationLogRepository medicationLogRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(RoleRepository roleRepository, UserRepository userRepository, PatientRepository patientRepository, DoctorRepository doctorRepository, MedicineRepository medicineRepository, InventoryRepository inventoryRepository, PrescriptionRepository prescriptionRepository, MedicationLogRepository medicationLogRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.medicineRepository = medicineRepository;
        this.inventoryRepository = inventoryRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.medicationLogRepository = medicationLogRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (roleRepository.count() > 0) {
            log.info("Database already seeded. Skipping initialization.");
            return;
        }

        log.info("Seeding initial database records...");

        // 1. Roles
        Role adminRole = roleRepository.save(Role.builder().name("ROLE_ADMIN").build());
        Role doctorRole = roleRepository.save(Role.builder().name("ROLE_DOCTOR").build());
        Role patientRole = roleRepository.save(Role.builder().name("ROLE_PATIENT").build());
        Role staffRole = roleRepository.save(Role.builder().name("ROLE_STAFF").build());

        // 2. Default Demo Users
        User adminUser = userRepository.save(User.builder()
                .email("admin@medicare.com")
                .password(passwordEncoder.encode("admin123"))
                .fullName("System Administrator")
                .role(adminRole)
                .phone("+1 555-0100")
                .status("ACTIVE")
                .build());

        User doctorUser = userRepository.save(User.builder()
                .email("doctor@medicare.com")
                .password(passwordEncoder.encode("doctor123"))
                .fullName("Dr. Sarah Jenkins")
                .role(doctorRole)
                .phone("+1 555-0101")
                .status("ACTIVE")
                .build());

        Doctor doctor = doctorRepository.save(Doctor.builder()
                .user(doctorUser)
                .specialization("General Internal Medicine")
                .licenseNumber("MD-998234")
                .qualification("MD, Harvard Medical School")
                .hospitalAffiliation("Metro Health Medical Center")
                .build());

        User patientUser = userRepository.save(User.builder()
                .email("patient@medicare.com")
                .password(passwordEncoder.encode("patient123"))
                .fullName("John Doe")
                .role(patientRole)
                .phone("+1 555-0102")
                .status("ACTIVE")
                .build());

        Patient patient = patientRepository.save(Patient.builder()
                .user(patientUser)
                .dateOfBirth(LocalDate.of(1990, 5, 15))
                .gender("Male")
                .bloodGroup("O+")
                .allergies("Penicillin")
                .emergencyContact("Jane Doe (+1 555-0199)")
                .build());

        User staffUser = userRepository.save(User.builder()
                .email("staff@medicare.com")
                .password(passwordEncoder.encode("staff123"))
                .fullName("Alex Rivera")
                .role(staffRole)
                .phone("+1 555-0103")
                .status("ACTIVE")
                .build());

        // 3. Medicines & Inventory
        Medicine med1 = medicineRepository.save(Medicine.builder()
                .name("Amoxicillin")
                .genericName("Amoxicillin Trihydrate")
                .manufacturer("Pfizer Pharmaceuticals")
                .category("Antibiotic")
                .dosageForm("Capsule")
                .unit("500mg")
                .description("Broad-spectrum penicillin antibiotic used to treat bacterial infections.")
                .build());

        inventoryRepository.save(Inventory.builder()
                .medicine(med1)
                .stockQuantity(120)
                .reorderLevel(30)
                .pricePerUnit(new BigDecimal("12.50"))
                .batchNumber("AMX-2026-01")
                .expiryDate(LocalDate.now().plusMonths(18))
                .status("IN_STOCK")
                .build());

        Medicine med2 = medicineRepository.save(Medicine.builder()
                .name("Paracetamol")
                .genericName("Acetaminophen")
                .manufacturer("GSK Healthcare")
                .category("Analgesic / Antipyretic")
                .dosageForm("Tablet")
                .unit("500mg")
                .description("Pain reliever and fever reducer.")
                .build());

        inventoryRepository.save(Inventory.builder()
                .medicine(med2)
                .stockQuantity(8)
                .reorderLevel(25)
                .pricePerUnit(new BigDecimal("4.00"))
                .batchNumber("PCM-2026-09")
                .expiryDate(LocalDate.now().plusMonths(12))
                .status("LOW_STOCK")
                .build());

        Medicine med3 = medicineRepository.save(Medicine.builder()
                .name("Metformin")
                .genericName("Metformin Hydrochloride")
                .manufacturer("Novartis")
                .category("Antidiabetic")
                .dosageForm("Tablet")
                .unit("850mg")
                .description("First-line medication for type 2 diabetes management.")
                .build());

        inventoryRepository.save(Inventory.builder()
                .medicine(med3)
                .stockQuantity(200)
                .reorderLevel(40)
                .pricePerUnit(new BigDecimal("18.00"))
                .batchNumber("MET-2026-04")
                .expiryDate(LocalDate.now().plusMonths(24))
                .status("IN_STOCK")
                .build());

        // 4. Sample Prescription
        Prescription rx = Prescription.builder()
                .patient(patient)
                .doctor(doctor)
                .diagnosisNotes("Acute Bronchial Infection and mild pyrexia.")
                .status("ACTIVE")
                .aiSummary("Prescribed 7-day Amoxicillin antibiotic course with Paracetamol for symptomatic fever relief. Monitor for penicillin sensitivity.")
                .build();

        PrescriptionItem item1 = PrescriptionItem.builder()
                .prescription(rx)
                .medicine(med1)
                .dosage("500mg")
                .frequency("Twice Daily")
                .durationDays(7)
                .instructions("Take after breakfast and dinner with water.")
                .timingSchedule("Morning, Evening")
                .build();

        PrescriptionItem item2 = PrescriptionItem.builder()
                .prescription(rx)
                .medicine(med2)
                .dosage("500mg")
                .frequency("As Needed")
                .durationDays(5)
                .instructions("Take every 6 hours if fever exceeds 100°F.")
                .timingSchedule("Afternoon, Night")
                .build();

        rx.setItems(List.of(item1, item2));
        Prescription savedRx = prescriptionRepository.save(rx);

        // 5. Medication Logs for Patient Schedule
        LocalDateTime today = LocalDateTime.now().withHour(8).withMinute(0);

        medicationLogRepository.save(MedicationLog.builder()
                .patient(patient)
                .prescriptionItem(savedRx.getItems().get(0))
                .scheduledTime(today)
                .status("TAKEN")
                .takenAt(today.plusMinutes(15))
                .notes("Taken with breakfast")
                .build());

        medicationLogRepository.save(MedicationLog.builder()
                .patient(patient)
                .prescriptionItem(savedRx.getItems().get(0))
                .scheduledTime(today.withHour(20))
                .status("PENDING")
                .build());

        log.info("Medicare Nexus AI database successfully seeded with demo accounts & records!");
    }
}
