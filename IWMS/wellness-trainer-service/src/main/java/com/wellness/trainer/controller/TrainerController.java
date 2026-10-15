package com.wellness.trainer.controller;

import com.wellness.trainer.entity.Trainer;
import com.wellness.trainer.service.TrainerService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainers")
public class TrainerController {

    private final TrainerService service;

    public TrainerController(TrainerService service) {
        this.service = service;
    }

    // ADMIN, TRAINER and MEMBER can view trainers
    @PreAuthorize("hasAnyRole('ADMIN', 'TRAINER', 'MEMBER')")
    @GetMapping
    public List<Trainer> getAllTrainers() {
        return service.getAllTrainers();
    }

    // ADMIN, TRAINER and MEMBER can view a trainer
    @PreAuthorize("hasAnyRole('ADMIN', 'TRAINER', 'MEMBER')")
    @GetMapping("/{id}")
    public Trainer getTrainerById(@PathVariable Integer id) {
        return service.getTrainerById(id);
    }

    // Only ADMIN can add a trainer
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Trainer addTrainer(@RequestBody Trainer trainer) {
        return service.addTrainer(trainer);
    }

    // Only ADMIN can edit a trainer
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public Trainer updateTrainer(@RequestBody Trainer trainer) {
        return service.updateTrainer(trainer);
    }

    // Only ADMIN can delete a trainer
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteTrainer(@PathVariable Integer id) {
        service.deleteTrainer(id);
        return "Trainer deleted successfully";
    }
}