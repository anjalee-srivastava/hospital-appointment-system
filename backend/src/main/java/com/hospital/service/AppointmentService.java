package com.hospital.service;

import com.hospital.dto.AppointmentRequest;
import com.hospital.model.Appointment;
import com.hospital.model.Doctor;
import com.hospital.model.User;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired private AppointmentRepository appointmentRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private DoctorService doctorService;

    public Appointment bookAppointment(AppointmentRequest request, String username) {
        User patient = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Doctor doctor = doctorService.getDoctorById(request.getDoctorId());

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDateTime(request.getAppointmentDateTime());
        appointment.setReason(request.getReason());
        appointment.setStatus(Appointment.Status.PENDING);

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getMyAppointments(String username) {
        User patient = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return appointmentRepository.findByPatientOrderByAppointmentDateTimeDesc(patient);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment updateStatus(Long id, String status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(Appointment.Status.valueOf(status.toUpperCase()));
        return appointmentRepository.save(appointment);
    }

    public void cancelAppointment(Long id, String username) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        if (!appointment.getPatient().getUsername().equals(username)) {
            throw new RuntimeException("Not authorized");
        }
        appointment.setStatus(Appointment.Status.CANCELLED);
        appointmentRepository.save(appointment);
    }
}
