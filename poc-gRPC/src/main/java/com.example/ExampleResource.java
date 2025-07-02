package com.example;

import io.quarkus.example.Greeter;
import io.quarkus.example.GreeterGrpc;
import io.quarkus.example.HelloReply;
import io.quarkus.example.HelloRequest;
import io.quarkus.grpc.GrpcClient;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

@Path("/hello")
public class ExampleResource {

    @GrpcClient("hello")
    Greeter helloService;

    @GrpcClient("hello")
    GreeterGrpc.GreeterBlockingStub blockingHelloService;

    @GET
    @Path("/blocking/{name}")
    public String helloBlocking(@PathParam("name") String name) {
        HelloReply reply = blockingHelloService.sayHello(
                HelloRequest.newBuilder()
                        .setName(name)
                        .build()
        );
        return generateResponse(reply);
    }

    @GET
    @Path("/mutiny/{name}")
    public Uni<String> helloMutiny(@PathParam("name") String name) {
        return helloService.sayHello(
                        HelloRequest.newBuilder()
                                .setName(name)
                                .build()
                )
                .onItem()
                .transform(this::generateResponse);
    }

    public String generateResponse(HelloReply reply) {
        return String.format(
                "%s! HelloWorldService has been called %d number of times.",
                reply.getMessage(),
                reply.getCount()
        );
    }
}

