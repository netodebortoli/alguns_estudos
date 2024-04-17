package dev.aristides.repository;

import java.util.HashMap;
import java.util.Map;

import dev.aristides.model.Coffe;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RepositoryCoffee {

   private Map<Integer, Coffe> db = new HashMap<>();

   public Coffe addCoffee(Coffe coffee) {
      db.put(coffee.getId(), coffee);
      return coffee;
   }

}
