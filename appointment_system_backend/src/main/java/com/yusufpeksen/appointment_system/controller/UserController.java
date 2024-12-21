package com.yusufpeksen.appointment_system.controller;

import com.yusufpeksen.appointment_system.dto.response.UserDetailResponse;
import com.yusufpeksen.appointment_system.entity.User;
import com.yusufpeksen.appointment_system.repository.UserRepository;
import com.yusufpeksen.appointment_system.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserDetailResponse>> getAllUsers() {
        List<UserDetailResponse> users = userService.getAllUser();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserDetailResponse> getDetailsByEmail(@PathVariable String email) {
        UserDetailResponse userDetails = userService.getUserByEmail(email);
        return ResponseEntity.ok(userDetails);
    }
}
