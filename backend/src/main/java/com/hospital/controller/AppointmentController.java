package com.hospital.controller;

import com.hospital.dto.AppointmentRequest;
import com.hospital.model.Appointment;
import com.hospital.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<Appointment> bookAppointment(
            @Valid @RequestBody AppointmentRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(appointmentService.bookAppointment(request, authentication.getName()));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Appointment>> getMyAppointments(Authentication authentication) {
        return ResponseEntity.ok(appointmentService.getMyAppointments(authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Appointment> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return ResponseEntity.ok(appointmentService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelAppointment(
            @PathVariable Long id,
            Authentication authentication) {
        appointmentService.cancelAppointment(id, authentication.getName());
        return ResponseEntity.ok("Appointment cancelled");
    }
}
