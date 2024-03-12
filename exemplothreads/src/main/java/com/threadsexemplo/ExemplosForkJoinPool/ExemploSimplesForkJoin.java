package com.threadsexemplo.ExemplosForkJoinPool;

import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveTask;

class FactorialSquareCalculator extends RecursiveTask<Integer> {

   private Integer n;

   public FactorialSquareCalculator(Integer n) {
      this.n = n;
   }

   @Override
   protected Integer compute() {
      if (n <= 1) {
         return n;
      }

      FactorialSquareCalculator calculator = new FactorialSquareCalculator(n - 1);

      calculator.fork();

      return n * n + calculator.join();
   }
}

public class ExemploSimplesForkJoin {

   public static void main(String[] args) {

      try (var forkJoinPool = ForkJoinPool.commonPool()) {

         int fatorial = 4;

         FactorialSquareCalculator calculator = new FactorialSquareCalculator(fatorial);

         // o método invoke() espera receber um ForkJoinTask<T>
         // O método invoke() executa o método compute(), herdado de RecursiveTask<T>
         int soma = forkJoinPool.invoke(calculator);

         // 4² + 3² + 2² + 1² = 30
         System.out.println(
               String.format("A soma fatorial dos quadrados até %s é %s", fatorial, soma));
      }
   }
}
