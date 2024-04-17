package dev.aristides;

import dev.aristides.model.Coffe;
import dev.aristides.repository.RepositoryCoffee;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/factory-coffes")
public class GreetingResource {

   @Inject
   RepositoryCoffee repositoryCoffee;

   @POST
   @Consumes(MediaType.APPLICATION_JSON)
   @Produces(MediaType.APPLICATION_JSON)
   public Coffe createCoffe(Coffe coffe) {
      return repositoryCoffee.addCoffee(coffe);
   }
}
