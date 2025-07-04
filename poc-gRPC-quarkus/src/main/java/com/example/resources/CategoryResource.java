package com.example.resources;

import com.example.model.CategoryEntity;
import com.example.resources.model.CreateCategory;
import io.quarkus.example.CategoryService;
import io.quarkus.example.CreateCategoryRequest;
import io.quarkus.example.Empty;
import io.quarkus.grpc.GrpcClient;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.time.Duration;
import java.util.List;

@Path("/categories")
@Consumes(value = MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CategoryResource {

    @GrpcClient("category") // quarkus.grpc.clients.category.host
    CategoryService categoryServiceClient;

    @POST
    public Uni<CategoryEntity> createCategory(CreateCategory newCategory) {
        return categoryServiceClient
                .createCategory(fromRequest(newCategory))
                .onItem()
                .transform(CategoryEntity::from);
    }

    @GET
    @Path("/all")
    public Uni<List<CategoryEntity>> listAllCategories() {
        Empty emptyRequest = Empty.getDefaultInstance();
        return categoryServiceClient
                .listAllCategories(emptyRequest)
                .onItem()
                .transform(response ->
                        response.getCategoriesList()
                                .stream()
                                .map(CategoryEntity::from)
                                .toList());
    }

    @POST
    @Path("/batch")
    public Uni<List<CategoryEntity>> createCategories(List<CreateCategory> categories) {
        return categoryServiceClient
                .createCategories(
                        Multi.createFrom()
                                .iterable(categories)
                                .onItem()
                                .call(item -> Uni.createFrom().nullItem().onItem().delayIt().by(Duration.ofMillis(500))) // Simulating delay for each item
                                .map(this::fromRequest)
                )
                .onItem()
                .transform(response ->
                        response.getCategoriesList()
                                .stream()
                                .map(CategoryEntity::from)
                                .toList());
    }

    @POST
    @Path("/batch/async")
    @Produces("application/stream+json") // Using a streaming response
    public Multi<CategoryEntity> createCategoriesAsync(List<CreateCategory> categories) {
        return categoryServiceClient
                .createCategoryBidirectional(
                        Multi.createFrom()
                                .iterable(categories)
                                .onItem()
                                .call(item -> Uni.createFrom().nullItem().onItem().delayIt().by(Duration.ofSeconds(1)))
                                .map(this::fromRequest)
                )
                .onItem()
                .transform(CategoryEntity::from);
    }

    private CreateCategoryRequest fromRequest(CreateCategory createCategory) {
        return CreateCategoryRequest
                .newBuilder()
                .setName(createCategory.name())
                .setDescription(createCategory.description())
                .build();
    }

}
