package com.aristidesdev.controller;

import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import org.eclipse.microprofile.faulttolerance.Fallback;
import org.eclipse.microprofile.faulttolerance.Retry;
import org.eclipse.microprofile.faulttolerance.Timeout;
import org.jboss.logging.Logger;

import com.aristidesdev.model.Coffe;
import com.aristidesdev.service.CoffeeService;
import com.aristidesdev.service.exception.FetchCoffeException;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/coffees")
public class CoffeeResource {

   private static final Logger LOGGER = Logger.getLogger(CoffeeResource.class);

   @Inject
   CoffeeService service;

   @GET
   @Path("/payment-methods")
   @Fallback(fallbackMethod = "fallbackResultMethodPayment")
   public String getPaymentMethods() {
      return service.getPaymentMethos();
   }

   @Retry(retryOn = RuntimeException.class, maxRetries = 3, delay = 500)
   @Fallback(fallbackMethod = "fallbackGetAllCoffesEmptyList")
   @GET
   @Produces(MediaType.APPLICATION_JSON)
   public List<Coffe> getAllCoffes() {
      introduceError();
      LOGGER.infof("CoffeeResource#getAllCoffes() invocation returning successfully");
      return service.getAllCoffes();
   }

   @Fallback(fallbackMethod = "fallbackRecommendationsEmptyList")
   @Timeout(value = 250, unit = ChronoUnit.MILLIS)
   @Retry(retryOn = Throwable.class, maxRetries = 2, delay = 200)
   @GET
   @Path("/{id}/recommendations")
   @Produces(MediaType.APPLICATION_JSON)
   public List<Coffe> getRecommendations(@PathParam("id") Integer id) {
      long started = System.currentTimeMillis();
      try {
         introduceDelay();
         LOGGER.infof("CoffeeResource#getRecommendations() invocation returning successfully after %d ms",
               System.currentTimeMillis() - started);
         return service.getRecommendations(id);
      } catch (InterruptedException e) {
         LOGGER.errorf("CoffeeResource#getRecommendations() invocation timed out after %d ms",
               System.currentTimeMillis() - started);
         return null;
      }
   }

   /*
    * Fallback Handlers
    */
   public List<Coffe> fallbackGetAllCoffesEmptyList() {
      return Collections.emptyList();
   }

   public List<Coffe> fallbackRecommendationsEmptyList(Integer id) {
      LOGGER.info("Falling back to RecommendationResource");
      return List.of(service.getById(1));
   }

   private String fallbackResultMethodPayment() {
      LOGGER.info("Fallback empty result to PaymentResource");
      return "Service unavailable, please try again later.";
   }

   /*
    * Helper methods
    */
   private void introduceDelay() throws InterruptedException {
      Thread.sleep(new Random().nextInt(500));
   }

   private void introduceError() {
      if (Math.random() <= 0.7) {
         LOGGER.errorf("CoffeeResource#getAllCoffes() invocation failed");
         throw new FetchCoffeException("An error occurred while fetching coffes");
      }
   }

}
