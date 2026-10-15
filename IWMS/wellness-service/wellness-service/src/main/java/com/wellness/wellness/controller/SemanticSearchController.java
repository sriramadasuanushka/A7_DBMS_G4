package com.wellness.wellness.controller;

import com.wellness.wellness.service.SemanticSearchService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
public class SemanticSearchController {

    private final SemanticSearchService service;

    public SemanticSearchController(SemanticSearchService service) {
        this.service = service;
    }

    @GetMapping
    public String search(@RequestParam String query) {
        return service.search(query);
    }
}