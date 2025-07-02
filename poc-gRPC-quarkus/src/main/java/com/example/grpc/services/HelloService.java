package com.example.grpc.services;

import io.grpc.stub.StreamObserver;
import io.quarkus.example.GreeterGrpc;
import io.quarkus.example.HelloReply;
import io.quarkus.example.HelloRequest;
import io.quarkus.grpc.GrpcService;

import java.util.concurrent.atomic.AtomicInteger;

@GrpcService // Expose implementation as a bean.
public class HelloService extends GreeterGrpc.GreeterImplBase { // Extends the ImplBase class. This is a generated class.

    AtomicInteger counter = new AtomicInteger();

    @Override
    public void sayHello(HelloRequest request, StreamObserver<HelloReply> responseObserver) { // Implement the methods defined in the service definition (here we have a single method).
        int count = counter.incrementAndGet();
        String name = request.getName();
        String message = "Hello " + name;
        responseObserver.onNext(
                HelloReply.newBuilder()
                        .setMessage(message)
                        .setCount(count)
                        .build()
        ); // Build and send the response.
        responseObserver.onCompleted(); // Close the response.
    }
}
