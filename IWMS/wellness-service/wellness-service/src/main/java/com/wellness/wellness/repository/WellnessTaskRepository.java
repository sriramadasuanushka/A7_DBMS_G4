package com.wellness.wellness.repository;

import com.wellness.wellness.entity.WellnessTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WellnessTaskRepository
        extends JpaRepository<WellnessTask, Integer> {

    List<WellnessTask> findByMemberId(Integer memberId);
}