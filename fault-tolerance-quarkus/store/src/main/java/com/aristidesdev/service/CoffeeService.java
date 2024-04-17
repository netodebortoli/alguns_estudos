package com.aristidesdev.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.eclipse.microprofile.rest.client.inject.RestClient;

import com.aristidesdev.model.Coffe;
import com.aristidesdev.service.configcb.PaymentCBConfig;
import com.aristidesdev.service.restclient.PaymentClient;

import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class CoffeeService {

   private Map<Integer, Coffe> memoryDb = new HashMap<>();

   @Inject
   @RestClient
   PaymentClient paymentClient;

   public CoffeeService() {
      memoryDb.put(1, new Coffe(1, "Cappuccino", 3.5));
      memoryDb.put(2, new Coffe(2, "Latte", 4.0));
      memoryDb.put(3, new Coffe(3, "Mocha", 4.5));
      memoryDb.put(4, new Coffe(4, "Frappuccino", 7.5));
   }

   public List<Coffe> getRecommendations(Integer id) {
      if (id == null) {
         return Collections.emptyList();
      }
      return memoryDb.values().stream()
            .filter(coffee -> !id.equals(coffee.getId()))
            .limit(2)
            .collect(Collectors.toList());
   }

   public List<Coffe> getAllCoffes() {
      return memoryDb.values().stream().collect(Collectors.toList());
   }

   public Coffe getById(Integer id) {
      return memoryDb.get(id);
   }

   public String getPaymentMethos() {
      CircuitBreaker cb = PaymentCBConfig.getCircuitBreakerRegistry().circuitBreaker("paymentCB");
      return cb.executeSupplier(() -> paymentClient.get());
   }

}