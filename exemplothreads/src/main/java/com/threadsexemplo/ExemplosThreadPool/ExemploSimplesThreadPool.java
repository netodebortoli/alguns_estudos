package com.threadsexemplo.ExemplosThreadPool;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExemploSimplesThreadPool {

   public static void main(String[] args) {
      // Criando um pool de threads fixo
      int tamanho_pool = 2;
      ExecutorService pool = Executors.newFixedThreadPool(tamanho_pool);

      // Criando array de tarefas
      int quantidade_tarefas = 4;
      Tarefa[] tarefas = new Tarefa[quantidade_tarefas];

      for (int i = 0; i < quantidade_tarefas; i++) {
         tarefas[i] = new Tarefa(i);
         pool.execute(tarefas[i]);
      }

      // O pool de threads é encerrado após a execução de todas as tarefas.
      pool.shutdown();

      /*
       * Como o número de tarefas é maior que o pool de threads, as tarefas precisam
       * esperar que seja liberado uma nova thread deste pool, para enfim serem
       * executadas.
       */
   }
}
