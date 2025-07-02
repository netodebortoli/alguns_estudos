package com.example.model;

import io.quarkus.example.CategoryResponse;

public record CategoryEntity(String id, String name, String description) {

    public static CategoryEntity from(CategoryResponse c) {
        return new CategoryEntity(
                c.getCategory().getId(),
                c.getCategory().getName(),
                c.getCategory().getDescription()
        );
    }
}
