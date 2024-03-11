package com.threadsexemplo.ExemplosThreadPool;

public class Tarefa implements Runnable {

   private int id;

   public Tarefa(int id) {
      this.id = id;
   }

   public void run() {
      for (int i = 0; i <= 100; i += 20) {
         // Realizando tarefa
         System.out.println("Tarefa " + id + " realizada em " + i + "%");
         try {
            Thread.sleep((int) (Math.random() * 1000));
         } catch (InterruptedException e) {
            e.printStackTrace();
         }
      }
      System.out.println("Tarefa " + id + " concluída!");
   }

}
