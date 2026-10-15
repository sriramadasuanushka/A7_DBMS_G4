package com.wellness.wellness.controller;

import com.wellness.wellness.entity.WellnessService;
import com.wellness.wellness.service.WellnessServiceService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;

@RestController
@RequestMapping("/api/services")
public class WellnessServiceController {

    private final WellnessServiceService service;

    public WellnessServiceController(WellnessServiceService service) {
        this.service = service;
    }

    @GetMapping
    public List<WellnessService> getAllServices() {
        return service.getAllServices();
    }

    @GetMapping("/{id}")
    public WellnessService getServiceById(@PathVariable Integer id) {
        return service.getServiceById(id);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public WellnessService addService(@RequestBody WellnessService wellnessService) {
        return service.addService(wellnessService);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public WellnessService updateService(@RequestBody WellnessService wellnessService) {
        return service.updateService(wellnessService);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteService(@PathVariable Integer id) {
        service.deleteService(id);
        return "Wellness service deleted successfully";
    }
}