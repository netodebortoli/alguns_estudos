package com.aristidesdev.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.aristidesdev.model.Coffe;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CoffeeService {

   private Map<Integer, Coffe> cache = new HashMap<>();

   public CoffeeService() {
      cache.put(1, new Coffe(1, "Cappuccino", 3.5));
      cache.put(2, new Coffe(2, "Latte", 4.0));
      cache.put(3, new Coffe(3, "Mocha", 4.5));
      cache.put(4, new Coffe(4, "Frappuccino", 7.5));
   }

   public List<Coffe> getRecommendations(Integer id) {
      if (id == null) {
         return Collections.emptyList();
      }
      return cache.values().stream()
            .filter(coffee -> !id.equals(coffee.getId()))
            .limit(2)
            .collect(Collectors.toList());
   }

   public List<Coffe> getAllCoffes() {
      return cache.values().stream().collect(Collectors.toList());
   }

   public Coffe getById(Integer id) {
      return cache.get(id);
   }

}