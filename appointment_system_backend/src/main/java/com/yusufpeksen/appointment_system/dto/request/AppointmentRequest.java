package com.yusufpeksen.appointment_system.dto.request;

import com.yusufpeksen.appointment_system.entity.Status;

import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentRequest {
    private Long providerId;
    private Long userId;
    private LocalDate date;
    private LocalTime time;


    public Long getProviderId() {
        return providerId;
    }

    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
