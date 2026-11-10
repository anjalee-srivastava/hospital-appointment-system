package com.hospital.repository;

import com.hospital.model.Appointment;
import com.hospital.model.User;
import com.hospital.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatient(User patient);
    List<Appointment> findByDoctor(Doctor doctor);
    List<Appointment> findByStatus(Appointment.Status status);
    List<Appointment> findByPatientOrderByAppointmentDateTimeDesc(User patient);
}
