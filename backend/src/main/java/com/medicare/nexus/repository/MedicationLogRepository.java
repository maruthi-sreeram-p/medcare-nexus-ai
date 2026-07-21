package com.medicare.nexus.repository;

import com.medicare.nexus.entity.MedicationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface MedicationLogRepository extends JpaRepository<MedicationLog, Long> {
    List<MedicationLog> findByPatientIdAndScheduledTimeBetweenOrderByScheduledTimeAsc(
            Long patientId, LocalDateTime start, LocalDateTime end);

    List<MedicationLog> findByPatientIdOrderByScheduledTimeDesc(Long patientId);

    long countByPatientIdAndStatus(Long patientId, String status);
}
