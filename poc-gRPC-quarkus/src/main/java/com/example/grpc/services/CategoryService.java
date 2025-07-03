package com.example.grpc.services;

import com.example.model.CategoryEntity;
import io.grpc.stub.StreamObserver;
import io.quarkus.example.*;
import io.quarkus.grpc.GrpcService;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@GrpcService
public class CategoryService extends CategoryServiceGrpc.CategoryServiceImplBase {
    // memory database
    Map<String, CategoryEntity> categoriesDb = new HashMap<>();

    public CategoryService() {
        CategoryEntity cat1 = new CategoryEntity(UUID.randomUUID().toString(), "Curso de Angular", "Curso Front-end Angular.");
        CategoryEntity cat2 = new CategoryEntity(UUID.randomUUID().toString(), "Curso de Java com Spring", "Curso Back-end Java com Spring.");
        categoriesDb.put(cat1.id(), cat1);
        categoriesDb.put(cat2.id(), cat2);
    }

    @Override
    public void createCategory(CreateCategoryRequest request, StreamObserver<Category> responseObserver) {
        String id = UUID.randomUUID().toString();
        CategoryEntity newCategory = new CategoryEntity(id, request.getName(), request.getDescription());
        categoriesDb.put(id, newCategory);
        Category response = Category.newBuilder()
                .setId(id)
                .setName(newCategory.name())
                .setDescription(newCategory.description())
                .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }


    @Override
    public void listAllCategories(Empty request, StreamObserver<ListCategoriesResponse> responseObserver) {
        ListCategoriesResponse.Builder responseBuilder = ListCategoriesResponse.newBuilder();
        for (CategoryEntity category : categoriesDb.values()) {
            Category response = Category
                    .newBuilder()
                    .setId(category.id())
                    .setName(category.name())
                    .setDescription(category.description())
                    .build();

            responseBuilder.addCategories(response);
        }
        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    }
}
