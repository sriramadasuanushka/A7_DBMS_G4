package com.wellness.wellness.controller;

import com.wellness.wellness.entity.Trainer;
import com.wellness.wellness.service.TrainerService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/trainers")
public class TrainerController {

    private final TrainerService service;

    public TrainerController(TrainerService service) {
        this.service = service;
    }

    @GetMapping
    public List<Trainer> getAllTrainers() {
        return service.getAllTrainers();
    }

    @GetMapping("/{id}")
    public Trainer getTrainerById(@PathVariable Integer id) {
        return service.getTrainerById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Trainer addTrainer(@RequestBody Trainer trainer) {
        return service.addTrainer(trainer);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public Trainer updateTrainer(@RequestBody Trainer trainer) {
        return service.updateTrainer(trainer);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteTrainer(@PathVariable Integer id) {
        service.deleteTrainer(id);
        return "Trainer deleted successfully";
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'TRAINER')")
    @GetMapping("/user/{userId}")
    public Trainer getTrainerByUserId(@PathVariable Integer userId) {
        return service.getTrainerByUserId(userId);
    }
}