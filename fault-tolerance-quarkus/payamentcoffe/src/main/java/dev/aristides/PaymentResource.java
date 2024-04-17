package dev.aristides;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;

import io.smallrye.faulttolerance.api.RateLimit;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/payment")
public class PaymentResource {

   private Random rand = new Random();

   private static final String CREDIT = "Credit";
   private static final String DEBIT = "Debit";
   private static final String CASH = "Cash";

   @RateLimit(value = 50, window = 2, windowUnit = ChronoUnit.SECONDS)
   @GET
   @Path("/methods")
   public String getMethods() {
      introduceDelay();
      introduceMaybeError();
      return List.of(CREDIT, DEBIT, CASH).toString();
   }

   private void introduceMaybeError() {
      if (rand.nextInt(100) >= 80) {
         throw new RuntimeException("An error occurred while payment methods");
      }
   }

   private void introduceDelay() {
      try {
         Thread.sleep(rand.nextInt(500));
      } catch (InterruptedException e) {
         e.printStackTrace();
      }
   }

}
