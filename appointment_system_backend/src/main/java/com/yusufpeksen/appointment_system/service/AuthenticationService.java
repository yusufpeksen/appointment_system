package com.yusufpeksen.appointment_system.service;

import com.yusufpeksen.appointment_system.dto.request.AuthenticationRequest;
import com.yusufpeksen.appointment_system.dto.request.RegisterRequest;
import com.yusufpeksen.appointment_system.dto.response.AuthenticationResponse;
import com.yusufpeksen.appointment_system.entity.Role;
import com.yusufpeksen.appointment_system.entity.User;
import com.yusufpeksen.appointment_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service

public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole(Role.USER);

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefresh(new HashMap<>(), user);

        AuthenticationResponse authRes = new AuthenticationResponse();
        authRes.setAuthToken(jwtToken);
        authRes.setRefreshToken(refreshToken);

        return authRes;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefresh(new HashMap<>(), user);

        AuthenticationResponse authRes = new AuthenticationResponse();
        authRes.setAuthToken(jwtToken);
        authRes.setRefreshToken(refreshToken);

        return authRes;
    }

    public AuthenticationResponse refreshToken(String refreshToken) {
        var user = userRepository.findByEmail(jwtService.getEmailFromToken(refreshToken))
                .orElseThrow(() -> new IllegalArgumentException("Invalid refresh token"));
        var jwtToken = jwtService.generateToken(user);
        var newRefreshToken = jwtService.generateRefresh(new HashMap<>(), user);

        AuthenticationResponse authRes = new AuthenticationResponse();
        authRes.setAuthToken(jwtToken);
        authRes.setRefreshToken(refreshToken);

        return authRes;
    }

    public Boolean validateToken(String token) {
        return jwtService.validateToken(token);
    }
}
