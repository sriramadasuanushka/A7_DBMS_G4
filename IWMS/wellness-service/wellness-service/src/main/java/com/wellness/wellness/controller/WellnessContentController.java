package com.wellness.wellness.controller;

import com.wellness.wellness.entity.WellnessContent;
import com.wellness.wellness.service.WellnessContentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wellness-content")
public class WellnessContentController {

    private final WellnessContentService service;

    public WellnessContentController(WellnessContentService service) {
        this.service = service;
    }

    @GetMapping
    public List<WellnessContent> getAllContent() {
        return service.getAllContent();
    }

    @GetMapping("/{id}")
    public WellnessContent getContentById(@PathVariable Integer id) {
        return service.getContentById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public WellnessContent addContent(@RequestBody WellnessContent content) {
        return service.addContent(content);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public WellnessContent updateContent(@RequestBody WellnessContent content) {
        return service.updateContent(content);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteContent(@PathVariable Integer id) {
        service.deleteContent(id);
        return "Wellness content deleted successfully";
    }
}