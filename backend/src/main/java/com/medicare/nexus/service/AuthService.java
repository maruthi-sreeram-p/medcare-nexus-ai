package com.medicare.nexus.service;

import com.medicare.nexus.dto.AuthDTOs.*;
import com.medicare.nexus.entity.*;
import com.medicare.nexus.exception.BadRequestException;
import com.medicare.nexus.exception.ResourceNotFoundException;
import com.medicare.nexus.repository.*;
import com.medicare.nexus.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PatientRepository patientRepository, DoctorRepository doctorRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return JwtResponse.builder()
                .token(jwt)
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().getName())
                .phone(user.getPhone())
                .build();
    }

    @Transactional
    public JwtResponse registerUser(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new BadRequestException("Email address already registered");
        }

        String roleName = registerRequest.getRole();
        if (!roleName.startsWith("ROLE_")) {
            roleName = "ROLE_" + roleName.toUpperCase();
        }

        String finalRoleName = roleName;
        Role role = roleRepository.findByName(finalRoleName)
                .orElseGet(() -> roleRepository.save(Role.builder().name(finalRoleName).build()));

        User user = User.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .fullName(registerRequest.getFullName())
                .role(role)
                .phone(registerRequest.getPhone())
                .status("ACTIVE")
                .build();

        User savedUser = userRepository.save(user);

        // Create role profile
        if ("ROLE_PATIENT".equals(finalRoleName)) {
            Patient patient = Patient.builder()
                    .user(savedUser)
                    .bloodGroup(registerRequest.getBloodGroup())
                    .emergencyContact(registerRequest.getEmergencyContact())
                    .build();
            patientRepository.save(patient);
        } else if ("ROLE_DOCTOR".equals(finalRoleName)) {
            Doctor doctor = Doctor.builder()
                    .user(savedUser)
                    .specialization(registerRequest.getSpecialization())
                    .licenseNumber(registerRequest.getLicenseNumber())
                    .build();
            doctorRepository.save(doctor);
        }

        return authenticateUser(LoginRequest.builder()
                .email(registerRequest.getEmail())
                .password(registerRequest.getPassword())
                .build());
    }

    public JwtResponse getCurrentUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return JwtResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().getName())
                .phone(user.getPhone())
                .build();
    }
}
