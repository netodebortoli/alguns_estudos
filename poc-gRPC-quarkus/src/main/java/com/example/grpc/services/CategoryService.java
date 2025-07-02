package com.example.grpc.services;

import com.example.model.CategoryEntity;
import io.grpc.stub.StreamObserver;
import io.quarkus.example.Category;
import io.quarkus.example.CategoryResponse;
import io.quarkus.example.CategoryServiceGrpc;
import io.quarkus.example.CreateCategoryRequest;
import io.quarkus.grpc.GrpcService;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@GrpcService
public class CategoryService extends CategoryServiceGrpc.CategoryServiceImplBase {
    // memory database
    Map<String, CategoryEntity> categories = new HashMap<>();

    @Override
    public void createCategory(CreateCategoryRequest request, StreamObserver<CategoryResponse> responseObserver) {
        String id = UUID.randomUUID().toString();
        CategoryEntity newCategory = new CategoryEntity(id, request.getName(), request.getDescription());

        categories.put(id, newCategory);

        Category response = Category.newBuilder()
                .setId(id)
                .setName(newCategory.name())
                .setDescription(newCategory.description())
                .build();
        responseObserver.onNext(CategoryResponse.newBuilder().setCategory(response).build());
        responseObserver.onCompleted();
    }
}
