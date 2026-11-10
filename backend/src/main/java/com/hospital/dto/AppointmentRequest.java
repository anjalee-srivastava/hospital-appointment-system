package com.hospital.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class AppointmentRequest {
    @NotNull
    private Long doctorId;
    @NotNull
    private LocalDateTime appointmentDateTime;
    private String reason;

    public AppointmentRequest() {}
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
    public LocalDateTime getAppointmentDateTime() { return appointmentDateTime; }
    public void setAppointmentDateTime(LocalDateTime appointmentDateTime) { this.appointmentDateTime = appointmentDateTime; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
