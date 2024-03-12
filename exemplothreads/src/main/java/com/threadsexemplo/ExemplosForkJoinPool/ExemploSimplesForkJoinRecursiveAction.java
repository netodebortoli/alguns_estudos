package com.threadsexemplo.ExemplosForkJoinPool;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.ForkJoinTask;
import java.util.concurrent.RecursiveAction;

public class ExemploSimplesForkJoinRecursiveAction extends RecursiveAction {

   private String workload = "";
   private static final int THRESHOLD = 4;

   public ExemploSimplesForkJoinRecursiveAction(String workload) {
      this.workload = workload;
   }

   @Override
   protected void compute() {
      // Cria as subtarefas com base na lógica do IF
      if (workload.length() > THRESHOLD) {
         // Invoca todas as subtarefas
         ForkJoinTask.invokeAll(createSubtasks());
      } else {
         processing(workload);
      }
   }

   private List<ExemploSimplesForkJoinRecursiveAction> createSubtasks() {
      List<ExemploSimplesForkJoinRecursiveAction> subtasks = new ArrayList<>();

      String partOne = workload.substring(0, workload.length() / 2);
      String partTwo = workload.substring(workload.length() / 2, workload.length());

      // Lógica recursiva
      subtasks.add(new ExemploSimplesForkJoinRecursiveAction(partOne));
      subtasks.add(new ExemploSimplesForkJoinRecursiveAction(partTwo));

      return subtasks;
   }

   private void processing(String work) {
      String result = work.toUpperCase();
      System.out.println("This result - (" + result + ") - was processed by " + Thread.currentThread().getName());
   }

   public static void main(String[] args) {
      String work = "Exemplos simples recursivos de ForkJoinPool";
      ExemploSimplesForkJoinRecursiveAction myRecursiveAction = new ExemploSimplesForkJoinRecursiveAction(work);

      // O método fork() cria uma nova tarefa que será executada pelo ForkJoinPool
      // O método join() faz com que a thread atual aguarde a conclusão da tarefa
      myRecursiveAction.fork();
      myRecursiveAction.join();

      // Outra alternativa, usando o ForkJoinPool para executar a tarefa
      // ForkJoinPool pool = ForkJoinPool.commonPool();
      // pool.invoke(myRecursiveAction);
   }

}
