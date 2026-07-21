package com.medicare.nexus.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(length = 100)
    private String specialization;

    @Column(name = "license_number", length = 50)
    private String licenseNumber;

    @Column(length = 100)
    private String qualification;

    @Column(name = "hospital_affiliation", length = 150)
    private String hospitalAffiliation;

    public Doctor() {}

    public Doctor(Long id, User user, String specialization, String licenseNumber, String qualification, String hospitalAffiliation) {
        this.id = id;
        this.user = user;
        this.specialization = specialization;
        this.licenseNumber = licenseNumber;
        this.qualification = qualification;
        this.hospitalAffiliation = hospitalAffiliation;
    }

    public static DoctorBuilder builder() {
        return new DoctorBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public String getQualification() { return qualification; }
    public void setQualification(String qualification) { this.qualification = qualification; }

    public String getHospitalAffiliation() { return hospitalAffiliation; }
    public void setHospitalAffiliation(String hospitalAffiliation) { this.hospitalAffiliation = hospitalAffiliation; }

    public static class DoctorBuilder {
        private Long id;
        private User user;
        private String specialization;
        private String licenseNumber;
        private String qualification;
        private String hospitalAffiliation;

        public DoctorBuilder id(Long id) { this.id = id; return this; }
        public DoctorBuilder user(User user) { this.user = user; return this; }
        public DoctorBuilder specialization(String specialization) { this.specialization = specialization; return this; }
        public DoctorBuilder licenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; return this; }
        public DoctorBuilder qualification(String qualification) { this.qualification = qualification; return this; }
        public DoctorBuilder hospitalAffiliation(String hospitalAffiliation) { this.hospitalAffiliation = hospitalAffiliation; return this; }

        public Doctor build() {
            return new Doctor(id, user, specialization, licenseNumber, qualification, hospitalAffiliation);
        }
    }
}
