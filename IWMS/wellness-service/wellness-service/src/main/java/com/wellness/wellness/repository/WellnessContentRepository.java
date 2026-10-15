package com.wellness.wellness.repository;

import com.wellness.wellness.entity.WellnessContent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WellnessContentRepository extends JpaRepository<WellnessContent, Integer> {
}