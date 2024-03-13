package com.threadsexemplo.ExemplosThreadsJava21;

public class ExemploThreadVirtual {

   public static void main(String[] args) throws InterruptedException {

      // Thread.ofVirtual() retorna um Builder ou um Factory para criar uma VT
      Thread thread = Thread.ofVirtual().start(() -> System.out.println("Hello World"));
      thread.join();
      
      // Crio um Builder de Thread Virtual, com o nome workThread e prefixo inicial 0
      Thread.Builder threadBuilder = Thread.ofVirtual().name("workThread-", 0);
      Runnable task = () -> {
         System.out.println("Thread ID: " + Thread.currentThread().threadId());
      };

      Thread t1 = threadBuilder.start(task);
      t1.join();
      System.out.println(t1.getName() + " finalizado");

      Thread t2 = threadBuilder.start(task);
      t2.join();
      System.out.println(t2.getName() + " finalizado");

   }

}
