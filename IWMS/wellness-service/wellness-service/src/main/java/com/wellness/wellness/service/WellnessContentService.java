package com.wellness.wellness.service;

import com.wellness.wellness.entity.WellnessContent;
import com.wellness.wellness.repository.WellnessContentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WellnessContentService {

    private final WellnessContentRepository repository;

    public WellnessContentService(WellnessContentRepository repository) {
        this.repository = repository;
    }

    public List<WellnessContent> getAllContent() {
        return repository.findAll();
    }

    public WellnessContent getContentById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public WellnessContent addContent(WellnessContent content) {
        return repository.save(content);
    }

    public WellnessContent updateContent(WellnessContent content) {
        return repository.save(content);
    }

    public void deleteContent(Integer id) {
        repository.deleteById(id);
    }
}