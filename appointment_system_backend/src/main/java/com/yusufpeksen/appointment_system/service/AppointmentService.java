package com.yusufpeksen.appointment_system.service;

import com.yusufpeksen.appointment_system.dto.request.AppointmentRequest;
import com.yusufpeksen.appointment_system.dto.response.AppointmentResponse;
import com.yusufpeksen.appointment_system.entity.Appointment;
import com.yusufpeksen.appointment_system.entity.Provider;
import com.yusufpeksen.appointment_system.entity.Status;
import com.yusufpeksen.appointment_system.entity.User;
import com.yusufpeksen.appointment_system.repository.AppointmentRepository;
import com.yusufpeksen.appointment_system.repository.ProviderRepository;
import com.yusufpeksen.appointment_system.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final ProviderRepository providerRepository;

    public AppointmentService(AppointmentRepository appointmentRepository, UserRepository userRepository, ProviderRepository providerRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.providerRepository = providerRepository;
    }

    public Appointment createAppointment(AppointmentRequest appointmentRequest) {
        Appointment appointment = new Appointment();

        User user = userRepository.findById(appointmentRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + appointmentRequest.getUserId()));

        Provider provider = providerRepository.findById(appointmentRequest.getProviderId())
                .orElseThrow(() -> new IllegalArgumentException("Provider not found with ID: " + appointmentRequest.getProviderId()));

        appointment.setProvider(provider);
        appointment.setUser(user);
        appointment.setAppointmentDate(appointmentRequest.getDate());
        appointment.setAppointmentTime(appointmentRequest.getTime());
        appointment.setStatus(Status.BOOKED);

        return appointmentRepository.save(appointment);
    }

    public List<AppointmentResponse> getAppointmentByUser(Long userId) {
        List<Appointment> appointmentList = appointmentRepository.findByUserId(userId);
        List<AppointmentResponse> appointmentResponseList = new ArrayList<>();

        appointmentList.forEach(appointment -> {
            AppointmentResponse response = new AppointmentResponse();
            response.setUserId(appointment.getUser().getId());
            response.setDate(appointment.getAppointmentDate());
            response.setTime(appointment.getAppointmentTime());
            response.setProviderId(appointment.getProvider().getId());
            appointmentResponseList.add(response);
        });

        return appointmentResponseList;
    }

    public List<String> getAvailableSlots(Long providerId, LocalDate date) {
        List<LocalTime> bookedSlots = appointmentRepository.findBookedSlots(providerId, date);

        List<LocalTime> allSlots = generateTimeSlots(LocalTime.of(9, 0), LocalTime.of(17, 0), 30);

        return allSlots.stream()
                .filter(slot -> !bookedSlots.contains(slot))
                .map(LocalTime::toString)
                .toList();
    }



    public List<LocalTime> generateTimeSlots(LocalTime start, LocalTime end, int intervalMinutes) {
        List<LocalTime> slots = new ArrayList<>();
        LocalTime current = start;

        while (current.isBefore(end)) {
            slots.add(current);
            current = current.plusMinutes(intervalMinutes);
        }

        return slots;
    }

}
