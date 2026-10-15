package com.wellness.wellness.repository;

import com.wellness.wellness.entity.WellnessProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WellnessProgressRepository
        extends JpaRepository<WellnessProgress, Integer> {

    List<WellnessProgress> findByMemberId(Integer memberId);
}