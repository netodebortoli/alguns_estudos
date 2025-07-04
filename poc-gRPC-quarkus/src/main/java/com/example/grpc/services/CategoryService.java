package com.example.grpc.services;

import com.example.model.CategoryEntity;
import com.example.repository.CategoryRepository;
import io.grpc.stub.StreamObserver;
import io.quarkus.example.*;
import io.quarkus.grpc.GrpcService;

@GrpcService
public class CategoryService extends CategoryServiceGrpc.CategoryServiceImplBase {

    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public void createCategory(CreateCategoryRequest request, StreamObserver<Category> responseObserver) {
        CategoryEntity newCategory = repository.create(request);
        Category response = toProtoCategory(newCategory);
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void listAllCategories(Empty request, StreamObserver<ListCategoriesResponse> responseObserver) {
        ListCategoriesResponse.Builder responseBuilder = ListCategoriesResponse.newBuilder();
        for (CategoryEntity category : repository.findAll()) {
            Category response = toProtoCategory(category);
            responseBuilder.addCategories(response);
        }
        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    }

    @Override
    public StreamObserver<CreateCategoryRequest> createCategories(StreamObserver<ListCategoriesResponse> responseObserver) {
        return new StreamObserver<>() {
            private final ListCategoriesResponse.Builder responseBuilder = ListCategoriesResponse.newBuilder();

            @Override
            public void onNext(CreateCategoryRequest request) {
                System.out.println("Received request to create category: " + request.getName());
                CategoryEntity newCategory = repository.create(request);
                Category response = toProtoCategory(newCategory);
                responseBuilder.addCategories(response);
            }

            @Override
            public void onError(Throwable t) {
                responseObserver.onError(t);
            }

            @Override
            public void onCompleted() {
                // Envia todas as categorias criadas de uma vez
                responseObserver.onNext(responseBuilder.build());
                responseObserver.onCompleted();
            }
        };
    }

    @Override
    public StreamObserver<CreateCategoryRequest> createCategoryBidirectional(StreamObserver<Category> responseObserver) {
        return new StreamObserver<>() {
            @Override
            public void onNext(CreateCategoryRequest request) {
                System.out.println("Received request to create category: " + request.getName());
                CategoryEntity newCategory = repository.create(request);
                Category response = toProtoCategory(newCategory);
                // Envia a categoria criada imediatamente
                responseObserver.onNext(response);
            }

            @Override
            public void onError(Throwable t) {
                responseObserver.onError(t);
            }

            @Override
            public void onCompleted() {
                responseObserver.onCompleted();
            }
        };
    }

    // Metodo auxiliar para criar um Category (proto) a partir do CategoryEntity
    private static Category toProtoCategory(CategoryEntity category) {
        return Category.newBuilder()
                .setId(category.id())
                .setName(category.name())
                .setDescription(category.description())
                .build();
    }
}
