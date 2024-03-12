package com.threadsexemplo.ExemplosFuture;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class SquareCalculator {
   // Pool de 2 threads fixos
   private ExecutorService executor = Executors.newFixedThreadPool(2);

   public Future<Integer> calculate(Integer input) {
      // Expressão lambda inferindo a interface Callable
      // Callable aciona o métdo call(), que retorna um valor
      // executor.submit() retorna um objeto do tipo TaskFuture
      return executor.submit(() -> {
         Thread.sleep(1000);
         return input * input;
      });
   }
}