package dev.aristides.model;

import java.util.Random;

public class Coffe {
   private Integer id;
   private String name;
   private Double price;

   private Coffe() {
   }

   public Coffe(String name, Double price) {
      this.id = new Random().nextInt();
      this.name = name;
      this.price = price;
   }

   public Integer getId() {
      return this.id;
   }

   public String getName() {
      return name;
   }

   public Double getPrice() {
      return price;
   }

}
