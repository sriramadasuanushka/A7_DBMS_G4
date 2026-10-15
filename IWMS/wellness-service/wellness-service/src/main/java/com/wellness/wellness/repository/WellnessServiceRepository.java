package com.wellness.wellness.repository;

import com.wellness.wellness.entity.WellnessService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WellnessServiceRepository
        extends JpaRepository<WellnessService, Integer> {
}