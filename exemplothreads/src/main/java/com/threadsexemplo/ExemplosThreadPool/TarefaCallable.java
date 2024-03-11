package com.threadsexemplo.ExemplosThreadPool;

import java.util.concurrent.Callable;

public class TarefaCallable implements Callable<Integer> {

   private Integer id;

   public TarefaCallable(Integer id) {
      this.id = id;
   }

   @Override
   public Integer call() throws Exception {
      Integer soma = 0;
      Integer sort;
      for (int i = 0; i <= 100; i += 20) {
         // Realizando tarefa do callable
         try {
            sort = (int) (Math.random() * 1000);
            soma += sort;
            System.out.println("Tarefa " + id + " realizada em " + i + "%. Tempo gasto corrente: " + soma + "ms.");
            Thread.sleep(sort);
         } catch (InterruptedException e) {
            e.printStackTrace();
         }
      }
      return (soma); // Retona a soma dos valores sorteados
   }

}
