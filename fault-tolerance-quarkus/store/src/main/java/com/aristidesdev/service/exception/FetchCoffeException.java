package com.aristidesdev.service.exception;

public class FetchCoffeException extends RuntimeException {

   public FetchCoffeException() {
      super("Error on fetching coffee.");
   }

   public FetchCoffeException(String msg) {
      super(msg);
   }

}
