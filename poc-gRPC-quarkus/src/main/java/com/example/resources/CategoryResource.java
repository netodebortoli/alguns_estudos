package com.example.resources;

import com.example.model.CategoryEntity;
import com.example.resources.model.CreateCategory;
import io.quarkus.example.CategoryService;
import io.quarkus.example.CreateCategoryRequest;
import io.quarkus.grpc.GrpcClient;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/categories")
public class CategoryResource {

    @GrpcClient("category") // quarkus.grpc.clients.category.host
    CategoryService categoryServiceClient;

    @POST
    @Consumes(value = MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Uni<CategoryEntity> createCategory(CreateCategory createCategory) {
        return categoryServiceClient.createCategory(
                CreateCategoryRequest.newBuilder()
                        .setName(createCategory.name())
                        .setDescription(createCategory.description())
                        .build())
                .onItem()
                .transform(CategoryEntity::from);
    }
}
