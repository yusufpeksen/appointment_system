package com.yusufpeksen.appointment_system.service;

import com.yusufpeksen.appointment_system.dto.response.ProviderResponse;
import com.yusufpeksen.appointment_system.entity.Provider;
import com.yusufpeksen.appointment_system.entity.Role;
import com.yusufpeksen.appointment_system.entity.User;
import com.yusufpeksen.appointment_system.repository.ProviderRepository;
import com.yusufpeksen.appointment_system.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProviderService {

    private final ProviderRepository providerRepository;
    private final UserRepository userRepository;

    public ProviderService(ProviderRepository providerRepository, UserRepository userRepository) {
        this.providerRepository = providerRepository;
        this.userRepository = userRepository;
    }

    public List<ProviderResponse> getAllProviders() {
        List<Provider> providers =  providerRepository.findAll();
        List<ProviderResponse> providersResponse = new ArrayList<>();

        providers.forEach(provider -> {
            ProviderResponse response = new ProviderResponse();
            response.setProviderId(provider.getId());
            response.setFirstName(provider.getFirstName());
            response.setLastName(provider.getLastName());
            providersResponse.add(response);
        });
        return providersResponse;
    }

    public ProviderResponse getProviderById(Long id) {
        Optional<Provider> provider = providerRepository.findById(id);
        ProviderResponse response = new ProviderResponse();

        response.setProviderId(provider.get().getId());
        response.setLastName(provider.get().getLastName());
        response.setFirstName(provider.get().getFirstName());

        return response;
    }

    public ProviderResponse createProvider(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        if (providerRepository.findByUserId(user.getId()).isPresent()) {
            throw new IllegalStateException("This user is already a provider.");
        }

        Provider provider = new Provider();
        user.setRole(Role.PROVIDER);
        provider.setUser(user);
        provider.setFirstName(user.getFirstName());
        provider.setLastName(user.getLastName());

        providerRepository.save(provider);

        ProviderResponse res = new ProviderResponse();
        res.setFirstName(provider.getFirstName());
        res.setLastName(provider.getLastName());
        res.setProviderId(provider.getId());

        return res;
    }

}
