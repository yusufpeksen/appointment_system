package com.yusufpeksen.appointment_system.repository;

import com.yusufpeksen.appointment_system.entity.Role;
import com.yusufpeksen.appointment_system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User , Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByRole(Role role);
}
