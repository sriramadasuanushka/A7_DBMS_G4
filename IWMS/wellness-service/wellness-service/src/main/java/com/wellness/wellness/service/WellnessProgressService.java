package com.wellness.wellness.service;

import com.wellness.wellness.entity.WellnessProgress;
import com.wellness.wellness.repository.WellnessProgressRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WellnessProgressService {

    private final WellnessProgressRepository repository;

    public WellnessProgressService(WellnessProgressRepository repository) {
        this.repository = repository;
    }

    public List<WellnessProgress> getAllProgress() {
        return repository.findAll();
    }

    public WellnessProgress getProgressById(Integer id) {
        return repository.findById(id).orElse(null);
    }
    public List<WellnessProgress> getProgressByMemberId(Integer memberId) {
        return repository.findByMemberId(memberId);
    }
    public WellnessProgress addProgress(WellnessProgress progress) {
        return repository.save(progress);
    }

    public WellnessProgress updateProgress(WellnessProgress progress) {
        return repository.save(progress);
    }

    public void deleteProgress(Integer id) {
        repository.deleteById(id);
    }
}