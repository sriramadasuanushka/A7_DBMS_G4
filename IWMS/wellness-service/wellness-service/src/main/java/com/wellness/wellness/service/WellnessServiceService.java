package com.wellness.wellness.service;

import com.wellness.wellness.entity.WellnessService;
import com.wellness.wellness.repository.WellnessServiceRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WellnessServiceService {

    private final WellnessServiceRepository repository;

    public WellnessServiceService(WellnessServiceRepository repository) {
        this.repository = repository;
    }

    @Cacheable("wellnessServices")
    public List<WellnessService> getAllServices() {
        return repository.findAll();
    }

    public WellnessService getServiceById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public WellnessService addService(WellnessService service) {
        return repository.save(service);
    }

    public WellnessService updateService(WellnessService service) {
        return repository.save(service);
    }

    public void deleteService(Integer id) {
        repository.deleteById(id);
    }
}