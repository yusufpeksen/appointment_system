package com.yusufpeksen.appointment_system.controller;

import com.yusufpeksen.appointment_system.dto.request.AppointmentRequest;
import com.yusufpeksen.appointment_system.dto.response.AppointmentResponse;
import com.yusufpeksen.appointment_system.entity.Appointment;
import com.yusufpeksen.appointment_system.service.AppointmentService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<AppointmentResponse>> getUserAppointment(@PathVariable Long userId) {
        List<AppointmentResponse> appointmentList = appointmentService.getAppointmentByUser(userId);
        return ResponseEntity.ok(appointmentList);
    }

    @GetMapping("/availability/{providerId}")
    public ResponseEntity<List<String>> getAvailableSlots(@PathVariable Long providerId, @RequestParam String date) {
        LocalDate appointmentDate = LocalDate.parse(date);
        List<String> availableSlots = appointmentService.getAvailableSlots(providerId, appointmentDate);
        return ResponseEntity.ok(availableSlots);
    }

    @PostMapping("/create")
    public ResponseEntity<AppointmentResponse> createAppointment(@RequestBody AppointmentRequest request) {
        Appointment appointment = appointmentService.createAppointment(request);

        AppointmentResponse response = new AppointmentResponse();
        response.setProviderId(appointment.getProvider().getId());
        response.setUserId(appointment.getUser().getId());
        response.setDate(appointment.getAppointmentDate());
        response.setTime(appointment.getAppointmentTime());

        return ResponseEntity.ok(response);
    }
}
