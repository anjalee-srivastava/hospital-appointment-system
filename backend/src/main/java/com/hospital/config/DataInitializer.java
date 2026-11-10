package com.hospital.config;

import com.hospital.model.Doctor;
import com.hospital.model.User;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired private UserRepository userRepository;
    @Autowired private DoctorRepository doctorRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Create admin user
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@hospital.com");
            admin.setFullName("Admin User");
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);
        }

        // Create patient user
        if (!userRepository.existsByUsername("patient1")) {
            User patient = new User();
            patient.setUsername("patient1");
            patient.setPassword(passwordEncoder.encode("patient123"));
            patient.setEmail("patient1@email.com");
            patient.setFullName("John Patient");
            patient.setRole(User.Role.PATIENT);
            userRepository.save(patient);
        }

        // Create sample doctors
        if (doctorRepository.count() == 0) {
            doctorRepository.save(new Doctor(null, "Dr. Sarah Johnson", "Cardiology",
                    "sarah.johnson@hospital.com", "+1-555-0101", "MD, FACC", 12,
                    "Specialist in heart diseases and cardiac surgery", true));

            doctorRepository.save(new Doctor(null, "Dr. Michael Chen", "Neurology",
                    "michael.chen@hospital.com", "+1-555-0102", "MD, PhD", 8,
                    "Expert in neurological disorders and brain health", true));

            doctorRepository.save(new Doctor(null, "Dr. Priya Sharma", "Pediatrics",
                    "priya.sharma@hospital.com", "+1-555-0103", "MBBS, MD", 10,
                    "Dedicated to children's health and wellness", true));

            doctorRepository.save(new Doctor(null, "Dr. Robert Williams", "Orthopedics",
                    "robert.williams@hospital.com", "+1-555-0104", "MD, MS Ortho", 15,
                    "Specialist in bone and joint disorders", true));

            doctorRepository.save(new Doctor(null, "Dr. Emily Davis", "Dermatology",
                    "emily.davis@hospital.com", "+1-555-0105", "MD, FAAD", 7,
                    "Expert in skin conditions and cosmetic dermatology", true));
        }

        System.out.println("✅ Sample data initialized!");
        System.out.println("👤 Admin: admin / admin123");
        System.out.println("👤 Patient: patient1 / patient123");
    }
}
