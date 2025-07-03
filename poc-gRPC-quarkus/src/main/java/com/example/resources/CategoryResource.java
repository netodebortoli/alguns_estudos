package com.example.resources;

import com.example.model.CategoryEntity;
import com.example.resources.model.CreateCategory;
import io.quarkus.example.CategoryService;
import io.quarkus.example.CreateCategoryRequest;
import io.quarkus.example.Empty;
import io.quarkus.grpc.GrpcClient;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/categories")
@Consumes(value = MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CategoryResource {

    @GrpcClient("category") // quarkus.grpc.clients.category.host
    CategoryService categoryServiceClient;

    @POST
    public Uni<CategoryEntity> createCategory(CreateCategory createCategory) {
        CreateCategoryRequest request = CreateCategoryRequest.newBuilder()
                .setName(createCategory.name())
                .setDescription(createCategory.description())
                .build();
        return categoryServiceClient
                .createCategory(request)
                .onItem()
                .transform(CategoryEntity::from);
    }

    @GET
    @Path("/all")
    public Uni<List<CategoryEntity>> listAllCategories() {
        Empty request = Empty.getDefaultInstance();
        return categoryServiceClient
                .listAllCategories(request)
                .onItem()
                .transform(response ->
                        response.getCategoriesList()
                                .stream()
                                .map(CategoryEntity::from)
                                .toList());
    }

}
