package com.example.repository;

import com.example.model.CategoryEntity;
import io.quarkus.example.CreateCategoryRequest;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@ApplicationScoped
public class CategoryRepository {
    Map<String, CategoryEntity> categoriesDb = new HashMap<>();

    public CategoryRepository() {
        // Initializing with some sample data
        CategoryEntity cat1 = new CategoryEntity(UUID.randomUUID().toString(), "Curso de Angular", "Curso Front-end Angular.");
        CategoryEntity cat2 = new CategoryEntity(UUID.randomUUID().toString(), "Curso de Java com Spring", "Curso Back-end Java com Spring.");
        categoriesDb.put(cat1.id(), cat1);
        categoriesDb.put(cat2.id(), cat2);
    }

    public List<CategoryEntity> findAll() {
        return categoriesDb.values()
                .stream()
                .toList();
    }

    public CategoryEntity create(CreateCategoryRequest request) {
        String id = UUID.randomUUID().toString();
        CategoryEntity category = new CategoryEntity(id, request.getName(), request.getDescription());
        categoriesDb.put(id, category);
        return category;
    }
}
