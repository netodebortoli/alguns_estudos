package com.threadsexemplo.ExemplosThreadsJava21;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class ExemploThreadVirtualComExecutors {

   public static void main(String[] args) {
      try (ExecutorService myExecutor = Executors.newVirtualThreadPerTaskExecutor()) {
         int numberOfThreads = 10;
         Future<?> futures[] = new Future[numberOfThreads];

         // Uso compartilhado de um Executors para criar 10 threads virtuais 
         // que executará 10 tarefas diferentes ao mesmo tempo
         for (int i = 0; i < numberOfThreads; i++) {
            futures[i] = myExecutor.submit(
                  () -> System.out.println("Thread ID: " + Thread.currentThread().threadId() + " Running thread"));
         }

         for (Future<?> future : futures) {
            future.get();
         }

         System.out.println("Task completed");

      } catch (InterruptedException | ExecutionException e) {
         e.printStackTrace();
      }
   }

}
