package com.threadsexemplo.ExemplosThreadPool;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

public class ExemploScheduledThreadPool {

   public static void main(String[] args) {

      // Cria um ScheduledThreadPool com 2 threads
      ScheduledExecutorService executorService = Executors.newScheduledThreadPool(2);

      // Cria uma lista do tipo ScheduledFuture<Intenger para armazenar os resultados
      // O retorno do callable 'TarefaCallable' é um Integer
      List<ScheduledFuture<Integer>> resultFuture = new ArrayList<>();

      for (int i = 0; i < 5; i++) {
         // Cria uma nova tarefa
         TarefaCallable tarefa = new TarefaCallable(i);
         // Adiciona a tarefa na lista de resultados
         // método 'schedule' agendará a execução da tarefa após 1 segundo
         resultFuture.add(
               executorService.schedule(tarefa, 1, TimeUnit.SECONDS));
      }

      executorService.shutdown();

      for (var future : resultFuture) {
         try {
            System.out.println("Tempo da tarefa: " + future.get());
         } catch (Exception e) {
            e.printStackTrace();
         }
      }
   }
}
