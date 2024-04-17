package com.aristidesdev.service.configcb;

import java.time.Duration;

import io.github.resilience4j.circuitbreaker.CircuitBreakerConfig;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;

public class PaymentCBConfig {
   private PaymentCBConfig() {
   }

   private static CircuitBreakerConfig config = CircuitBreakerConfig.custom()
         .failureRateThreshold(50)
         .waitDurationInOpenState(Duration.ofSeconds(5))
         .permittedNumberOfCallsInHalfOpenState(3)
         .minimumNumberOfCalls(10)
         .slidingWindowSize(2)
         .build();

   private static CircuitBreakerRegistry circuitBreakerRegistry = CircuitBreakerRegistry.of(config);

   public static CircuitBreakerConfig getConfig() {
      return config;
   }

   public static CircuitBreakerRegistry getCircuitBreakerRegistry() {
      return circuitBreakerRegistry;
   }

}
