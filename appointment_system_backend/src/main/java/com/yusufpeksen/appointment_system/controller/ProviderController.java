package com.yusufpeksen.appointment_system.controller;

import com.yusufpeksen.appointment_system.dto.response.ProviderResponse;
import com.yusufpeksen.appointment_system.service.ProviderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/provider")
public class ProviderController {

    private final ProviderService providerService;

    public ProviderController(ProviderService providerService) {
        this.providerService = providerService;
    }

    @PostMapping("/add")
    public ResponseEntity<ProviderResponse> addProvider(@RequestParam Long userId) {
        ProviderResponse providerResponse = providerService.createProvider(userId);
        return ResponseEntity.ok(providerResponse);
    }

    @GetMapping("/getAllProviders")
    public ResponseEntity<List<ProviderResponse>> getAllProviders() {
        List<ProviderResponse> providers = providerService.getAllProviders();
        return ResponseEntity.ok(providers);
    }

    @GetMapping("/{providerId}")
    public ResponseEntity<ProviderResponse> getProviderById(@PathVariable Long providerId) {
        ProviderResponse response = providerService.getProviderById(providerId);
        return ResponseEntity.ok(response);
    }
}
