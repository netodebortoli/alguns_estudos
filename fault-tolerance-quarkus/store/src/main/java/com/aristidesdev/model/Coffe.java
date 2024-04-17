package com.aristidesdev.model;

public class Coffe {
   private Integer id;
   private String name;
   private Double price;

   private Coffe() {
   }

   public Coffe(Integer id, String name, Double price) {
      this.id = id;
      this.name = name;
      this.price = price;
   }

   public Integer getId() {
      return id;
   }

   @Override
   public String toString() {
      return "Coffe [id=" + id + ", name=" + name + ", price=" + price + "]";
   }

}
