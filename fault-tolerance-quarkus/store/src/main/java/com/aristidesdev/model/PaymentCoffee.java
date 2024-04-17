package com.aristidesdev.model;

public class PaymentCoffee {
   Integer coffeeId;
   double price;

   public PaymentCoffee(Integer id, double price) {
      this.coffeeId = id;
      this.price = price * 1.1;
   }

   public Integer getCoffeeId() {
      return coffeeId;
   }

   public double getPrice() {
      return price;
   }

}