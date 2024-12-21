package com.yusufpeksen.appointment_system.service;

import com.yusufpeksen.appointment_system.dto.response.UserDetailResponse;
import com.yusufpeksen.appointment_system.entity.User;
import com.yusufpeksen.appointment_system.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetailResponse getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        UserDetailResponse userDetailResponse = new UserDetailResponse();
        userDetailResponse.setUserId(user.get().getId());
        userDetailResponse.setEmail(user.get().getEmail());
        userDetailResponse.setFirstName(user.get().getFirstName());
        userDetailResponse.setLastName(user.get().getLastName());
        userDetailResponse.setRole(user.get().getRole());

        return userDetailResponse;
    }

    public List<UserDetailResponse> getAllUser() {
        List<User> users = userRepository.findAll();

        return users.stream().map(user -> {
            UserDetailResponse response = new UserDetailResponse();
            response.setUserId(user.getId());
            response.setFirstName(user.getFirstName());
            response.setLastName(user.getLastName());
            response.setEmail(user.getEmail());
            response.setRole(user.getRole());
            return response;
        }).collect(Collectors.toList());
    }
}
