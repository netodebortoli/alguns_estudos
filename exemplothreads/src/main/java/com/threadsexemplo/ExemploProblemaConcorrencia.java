package com.threadsexemplo;

public class ExemploProblemaConcorrencia extends Thread {

   public static int cont = 0;

   public static void main(String[] args) throws InterruptedException {
      ExemploProblemaConcorrencia thread = new ExemploProblemaConcorrencia();
      thread.start();
      System.out.println(cont);
      cont++;
      System.out.println(cont);
   }

   public void run() {
      cont++;
   }
}