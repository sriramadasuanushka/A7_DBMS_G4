package com.wellness.wellness.controller;

import com.wellness.wellness.entity.WellnessProgress;
import com.wellness.wellness.service.WellnessProgressService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class WellnessProgressController {

    private final WellnessProgressService service;

    public WellnessProgressController(WellnessProgressService service) {
        this.service = service;
    }

    @GetMapping
    public List<WellnessProgress> getAllProgress() {
        return service.getAllProgress();
    }

    @GetMapping("/{id}")
    public WellnessProgress getProgressById(@PathVariable Integer id) {
        return service.getProgressById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public WellnessProgress addProgress(@RequestBody WellnessProgress progress) {
        return service.addProgress(progress);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public WellnessProgress updateProgress(@RequestBody WellnessProgress progress) {
        return service.updateProgress(progress);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteProgress(@PathVariable Integer id) {
        service.deleteProgress(id);
        return "Wellness progress deleted successfully";
    }

    @GetMapping("/member/{memberId}")
    public List<WellnessProgress> getProgressByMemberId(
            @PathVariable Integer memberId) {

        return service.getProgressByMemberId(memberId);
    }
}