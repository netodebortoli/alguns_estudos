package dev.aristides;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/prices")
public class PriceResource {

   @Inject
   PriceConsumer consumer;

   @GET
   @Path("last")
   @Produces(MediaType.TEXT_PLAIN)
   public String last() {
      return consumer.getLastPrice();
   }

}
