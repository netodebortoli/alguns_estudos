package com.aristidesdev.service.restclient;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@RegisterRestClient(baseUri = "http://localhost:8082/payment")
public interface PaymentClient {

   @GET
   @Path("/methods")
   String get();

}
