package com.threadsexemplo.ExemplosFuture;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

public class ExemploMultiThreadFuture {

   public static void main(String[] args) throws InterruptedException {

      SquareCalculator squareCalculator = new SquareCalculator();

      Future<Integer> future1 = squareCalculator.calculate(10);
      Future<Integer> future2 = squareCalculator.calculate(100);

      // Verifico se o Future está concluído ("isDone()") antes de acessá-lo com get()
      while (!(future1.isDone() && future2.isDone())) {
         System.out.println(
               String.format(
                     "future1 está %s e future2 está %s",
                     future1.isDone() ? "conclúido" : "em andamento",
                     future2.isDone() ? "conclúido" : "em andamento"));
         Thread.sleep(300);
      }

      Integer result1 = 0;
      Integer result2 = 0;
      try {
         result1 = future1.get();
         result2 = future2.get();
      } catch (InterruptedException | ExecutionException e) {
         e.printStackTrace();
      }

      System.out.println(result1 + " e " + result2);

   }

}
