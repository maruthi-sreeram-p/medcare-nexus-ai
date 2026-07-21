package com.medicare.nexus.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(length = 20)
    private String gender;

    @Column(name = "blood_group", length = 10)
    private String bloodGroup;

    @Column(columnDefinition = "TEXT")
    private String allergies;

    @Column(name = "emergency_contact", length = 50)
    private String emergencyContact;

    public Patient() {}

    public Patient(Long id, User user, LocalDate dateOfBirth, String gender, String bloodGroup, String allergies, String emergencyContact) {
        this.id = id;
        this.user = user;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.bloodGroup = bloodGroup;
        this.allergies = allergies;
        this.emergencyContact = emergencyContact;
    }

    public static PatientBuilder builder() {
        return new PatientBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getAllergies() { return allergies; }
    public void setAllergies(String allergies) { this.allergies = allergies; }

    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }

    public static class PatientBuilder {
        private Long id;
        private User user;
        private LocalDate dateOfBirth;
        private String gender;
        private String bloodGroup;
        private String allergies;
        private String emergencyContact;

        public PatientBuilder id(Long id) { this.id = id; return this; }
        public PatientBuilder user(User user) { this.user = user; return this; }
        public PatientBuilder dateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; return this; }
        public PatientBuilder gender(String gender) { this.gender = gender; return this; }
        public PatientBuilder bloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; return this; }
        public PatientBuilder allergies(String allergies) { this.allergies = allergies; return this; }
        public PatientBuilder emergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; return this; }

        public Patient build() {
            return new Patient(id, user, dateOfBirth, gender, bloodGroup, allergies, emergencyContact);
        }
    }
}
