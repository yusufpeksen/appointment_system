package com.yusufpeksen.appointment_system.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @PostMapping("/testAdmin")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello from admin");
    }
}
