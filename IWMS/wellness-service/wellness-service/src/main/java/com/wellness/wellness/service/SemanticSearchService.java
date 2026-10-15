package com.wellness.wellness.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class SemanticSearchService {

    private final RestClient restClient;

    public SemanticSearchService() {
        this.restClient = RestClient
                .builder()
                .baseUrl("http://localhost:5000")
                .build();
    }

    public String search(String query) {

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search")
                        .queryParam("query", query)
                        .build())
                .retrieve()
                .body(String.class);
    }
}