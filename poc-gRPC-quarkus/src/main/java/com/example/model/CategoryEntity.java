package com.example.model;

import io.quarkus.example.Category;

public record CategoryEntity(String id, String name, String description) {

    public static CategoryEntity from(Category c) {
        return new CategoryEntity(
                c.getId(),
                c.getName(),
                c.getDescription()
        );
    }
}
