package com.threadsexemplo;

class MyThread implements Runnable {

   @Override
   public void run() {
      System.out.println("Executando thread.");
   }
}

public class ExemploThreadSimples {

   public static void main(String[] args) {
      // Declarando a interface e chamando o método run()
      MyThread myThread = new MyThread();

      // Criando uma thread e associando a interface Ruunable
      Thread thread = new Thread(myThread);

      // start() para iniciar uma thread em Java
      thread.start();
   }
}
