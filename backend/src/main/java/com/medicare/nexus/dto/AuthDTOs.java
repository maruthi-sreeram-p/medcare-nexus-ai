package com.medicare.nexus.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDTOs {

    public static class LoginRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;

        public LoginRequest() {}

        public LoginRequest(String email, String password) {
            this.email = email;
            this.password = password;
        }

        public static LoginRequestBuilder builder() {
            return new LoginRequestBuilder();
        }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public static class LoginRequestBuilder {
            private String email;
            private String password;

            public LoginRequestBuilder email(String email) { this.email = email; return this; }
            public LoginRequestBuilder password(String password) { this.password = password; return this; }
            public LoginRequest build() { return new LoginRequest(email, password); }
        }
    }

    public static class RegisterRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;

        @NotBlank(message = "Full name is required")
        private String fullName;

        @NotBlank(message = "Role is required")
        private String role;

        private String phone;
        private String specialization;
        private String licenseNumber;
        private String bloodGroup;
        private String emergencyContact;

        public RegisterRequest() {}

        public RegisterRequest(String email, String password, String fullName, String role, String phone, String specialization, String licenseNumber, String bloodGroup, String emergencyContact) {
            this.email = email;
            this.password = password;
            this.fullName = fullName;
            this.role = role;
            this.phone = phone;
            this.specialization = specialization;
            this.licenseNumber = licenseNumber;
            this.bloodGroup = bloodGroup;
            this.emergencyContact = emergencyContact;
        }

        public static RegisterRequestBuilder builder() {
            return new RegisterRequestBuilder();
        }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }

        public String getSpecialization() { return specialization; }
        public void setSpecialization(String specialization) { this.specialization = specialization; }

        public String getLicenseNumber() { return licenseNumber; }
        public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

        public String getBloodGroup() { return bloodGroup; }
        public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

        public String getEmergencyContact() { return emergencyContact; }
        public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }

        public static class RegisterRequestBuilder {
            private String email;
            private String password;
            private String fullName;
            private String role;
            private String phone;
            private String specialization;
            private String licenseNumber;
            private String bloodGroup;
            private String emergencyContact;

            public RegisterRequestBuilder email(String email) { this.email = email; return this; }
            public RegisterRequestBuilder password(String password) { this.password = password; return this; }
            public RegisterRequestBuilder fullName(String fullName) { this.fullName = fullName; return this; }
            public RegisterRequestBuilder role(String role) { this.role = role; return this; }
            public RegisterRequestBuilder phone(String phone) { this.phone = phone; return this; }
            public RegisterRequestBuilder specialization(String specialization) { this.specialization = specialization; return this; }
            public RegisterRequestBuilder licenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; return this; }
            public RegisterRequestBuilder bloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; return this; }
            public RegisterRequestBuilder emergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; return this; }

            public RegisterRequest build() {
                return new RegisterRequest(email, password, fullName, role, phone, specialization, licenseNumber, bloodGroup, emergencyContact);
            }
        }
    }

    public static class JwtResponse {
        private String token;
        private String tokenType = "Bearer";
        private Long id;
        private String email;
        private String fullName;
        private String role;
        private String phone;

        public JwtResponse() {}

        public JwtResponse(String token, String tokenType, Long id, String email, String fullName, String role, String phone) {
            this.token = token;
            this.tokenType = tokenType != null ? tokenType : "Bearer";
            this.id = id;
            this.email = email;
            this.fullName = fullName;
            this.role = role;
            this.phone = phone;
        }

        public static JwtResponseBuilder builder() {
            return new JwtResponseBuilder();
        }

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }

        public String getTokenType() { return tokenType; }
        public void setTokenType(String tokenType) { this.tokenType = tokenType; }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }

        public static class JwtResponseBuilder {
            private String token;
            private String tokenType = "Bearer";
            private Long id;
            private String email;
            private String fullName;
            private String role;
            private String phone;

            public JwtResponseBuilder token(String token) { this.token = token; return this; }
            public JwtResponseBuilder tokenType(String tokenType) { this.tokenType = tokenType; return this; }
            public JwtResponseBuilder id(Long id) { this.id = id; return this; }
            public JwtResponseBuilder email(String email) { this.email = email; return this; }
            public JwtResponseBuilder fullName(String fullName) { this.fullName = fullName; return this; }
            public JwtResponseBuilder role(String role) { this.role = role; return this; }
            public JwtResponseBuilder phone(String phone) { this.phone = phone; return this; }

            public JwtResponse build() {
                return new JwtResponse(token, tokenType, id, email, fullName, role, phone);
            }
        }
    }
}
