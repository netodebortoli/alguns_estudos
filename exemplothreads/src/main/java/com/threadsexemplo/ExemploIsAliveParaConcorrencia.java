package com.threadsexemplo;

public class ExemploIsAliveParaConcorrencia extends Thread {

   static int cont = 0;

   public static void main(String[] args) throws InterruptedException {
      ExemploIsAliveParaConcorrencia thread = new ExemploIsAliveParaConcorrencia();
      thread.start();
      while (thread.isAlive()) {
         System.out.println("Esperando o término da execução de thread...");
      }
      System.out.println(cont);
      cont++;
      System.out.println(cont);
   }

   public void run() {
      cont++;
   }

}
