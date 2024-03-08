package com.threadsexemplo;

class SampleThread2 extends Thread {
   @Override
   public void run() {
      try {
         System.out.println("Thread " + this.getName() + " started");
         for (int i = 0; i < 10; i++) {
            System.out.println(i);
            Thread.sleep(50);
         }
      } catch (InterruptedException e) {
         e.printStackTrace();
      }

   }
}

class SampleThread extends Thread {
   public int processingCount = 0;

   SampleThread(int processingCount) {
      this.processingCount = processingCount;
      System.out.println("Thread Created");
   }

   @Override
   public void run() {
      System.out.println("Thread " + this.getName() + " started");
      while (processingCount > 0) {
         try {
            Thread.sleep(1000);
         } catch (InterruptedException e) {
            System.out.println("Thread " + this.getName() + " interrupted");
         }
         processingCount--;
         System.out.println("Inside Thread " + this.getName() + ", processingCount = " + processingCount);
      }
      System.out.println("Thread " + this.getName() + " exiting");
   }
}

public class ExemploJoinThread {
   public static void main(String[] args) throws InterruptedException {
      Thread t2 = new SampleThread(1);
      Thread t1 = new SampleThread2();
      t2.start();
      t2.join();
      /*
       * Thread t1 irá esperar t2 terminar, para depois ser executado.
       * Além disso, todas as outras operações do código serão executadas.
       * Portanto, no final restará apenas a execução do código da thread1 para ser exibida.
       */
      t1.start();
      System.out.println("Invoking join");
      System.out.println("Returned from join");
   }
}
