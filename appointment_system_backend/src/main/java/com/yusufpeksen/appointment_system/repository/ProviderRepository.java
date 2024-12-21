package com.yusufpeksen.appointment_system.repository;

import com.yusufpeksen.appointment_system.entity.Provider;
import com.yusufpeksen.appointment_system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProviderRepository extends JpaRepository<Provider , Long> {

    Optional<Provider> findByUserId(Long userId);
}
