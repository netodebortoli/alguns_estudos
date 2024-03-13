package com.threadsexemplo.ExemplosThreadsJava21;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.StructuredTaskScope;
import java.util.concurrent.StructuredTaskScope.Subtask;

import javax.management.RuntimeErrorException;

public class ExemploThreadStructuredConcurrency {
   public static void main(String[] args) throws InterruptedException {

      // Declara uma lista de tarefas
      Callable<String> tarefa1 = () -> "Task 1";
      Callable<String> tarefa2 = () -> "Task 2";
      Callable<String> tarefa4 = () -> "Task 4";

      // Introduz uma tarefa com erro proposital
      Callable<String> tarefa3 = () -> {
         throw new RuntimeErrorException(null, "Error");
      };

      List<Callable<String>> tarefas = List.of(tarefa1, tarefa2, tarefa3, tarefa4);

      // Declaro um scopo de tarefas estruturadas em que
      // se uma das tarefas falhar, todas as outras serão canceladas
      // (ShutdownOnFailure)
      try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {

         // Irá percorrer a lista de Callable e executar cada uma delas
         // No momento que ocorrer um erro, o método throwIfFailed() é lançado e para a execução do resto
         List<Subtask<String>> resultado = tarefas.stream()
               .map(tarefa -> scope.fork(tarefa)) // fork() espera receber uma Callable
               .toList();

         scope.join();
         scope.throwIfFailed(e -> new RuntimeException("Error ao exeutar as tarefas!"));

         resultado.forEach(r -> System.out.println(r.get()));
      }
   }

}
