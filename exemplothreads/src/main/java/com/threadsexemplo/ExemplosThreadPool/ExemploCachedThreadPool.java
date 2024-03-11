package com.threadsexemplo.ExemplosThreadPool;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class ExemploCachedThreadPool {
   public static void main(String[] args) {
      // Cria quantos threads forem necessários mas reutiliza threads quando uma
      // tarefa termina.
      ExecutorService pool = Executors.newCachedThreadPool();

      // Numero de tarefas
      int quantidade_tarefas = 10;
      TarefaCallable tarefas[] = new TarefaCallable[quantidade_tarefas];

      // Cria um array de future, para armazenar o retorno dos resultados de submit
      // Com o objeto Future, é possível receber o resultado, monitorar e cancelar
      Future<?> future[] = new Future[quantidade_tarefas];

      for (int i = 0; i < quantidade_tarefas; i++) {
         tarefas[i] = new TarefaCallable(i); // Cria um objeto do tipo tarefa
         future[i] = pool.submit(tarefas[i]); // Submete a tarefa para execução no pool e armazena o retorno
      }

      for (int i = 0; i < future.length; i++) {
         try {
            System.out.println("Fim da tarefa: " + future[i].get());
         } catch (Exception e) {
            e.printStackTrace();
         }
      }
      pool.shutdown();
   }
}
