package com.yusufpeksen.appointment_system.repository;

import com.yusufpeksen.appointment_system.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("SELECT a.appointmentTime FROM Appointment a " +
            "WHERE a.provider.id = :providerId AND a.appointmentDate = :date AND a.status = 'BOOKED'")
    List<LocalTime> findBookedSlots(@Param("providerId") Long providerId, @Param("date") LocalDate date);
    List<Appointment> findByUserId(Long userId);
}

