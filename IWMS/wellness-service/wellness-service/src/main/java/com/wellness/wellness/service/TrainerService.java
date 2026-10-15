package com.wellness.wellness.service;

import com.wellness.wellness.entity.Trainer;
import com.wellness.wellness.repository.TrainerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerService {

    private final TrainerRepository repository;

    public TrainerService(TrainerRepository repository) {
        this.repository = repository;
    }

    public List<Trainer> getAllTrainers() {
        return repository.findAll();
    }

    public Trainer getTrainerById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Trainer addTrainer(Trainer trainer) {
        return repository.save(trainer);
    }

    public Trainer updateTrainer(Trainer trainer) {
        return repository.save(trainer);
    }

    public void deleteTrainer(Integer id) {
        repository.deleteById(id);
    }
    public Trainer getTrainerByUserId(Integer userId) {
        return repository.findByUserId(userId).orElse(null);
    }
}