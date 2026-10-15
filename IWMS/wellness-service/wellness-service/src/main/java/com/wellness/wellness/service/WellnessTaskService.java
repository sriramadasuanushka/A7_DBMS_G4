package com.wellness.wellness.service;

import com.wellness.wellness.entity.WellnessTask;
import com.wellness.wellness.repository.WellnessTaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WellnessTaskService {

    private final WellnessTaskRepository repository;

    public WellnessTaskService(WellnessTaskRepository repository) {
        this.repository = repository;
    }

    public List<WellnessTask> getTasksByMemberId(Integer memberId) {
        return repository.findByMemberId(memberId);
    }

    public WellnessTask saveTask(WellnessTask task) {
        return repository.save(task);
    }

    public WellnessTask getTaskById(Integer taskId) {
        return repository.findById(taskId).orElse(null);
    }
}