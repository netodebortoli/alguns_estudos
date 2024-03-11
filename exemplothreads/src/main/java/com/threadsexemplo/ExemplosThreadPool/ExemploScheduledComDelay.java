package com.threadsexemplo.ExemplosThreadPool;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class ExemploScheduledComDelay {

   public static void main(String[] args) {

      ScheduledExecutorService pool = Executors.newSingleThreadScheduledExecutor();

      pool.scheduleWithFixedDelay(() -> {
         System.out.println("Tarefa agendada após 1 segundo... com delay de 2 segundos entre as execuções.");
      }, 1, 2, TimeUnit.SECONDS);

      try {
         pool.awaitTermination(11, TimeUnit.SECONDS);
         pool.shutdown();
      } catch (InterruptedException e) {
         e.printStackTrace();
      }

   }

}
