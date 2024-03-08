package com.threadsexemplo;

class Conta {
   double saldo;
   String numero;

   Conta(String numero) {
      saldo = 0;
      this.numero = numero;
   }

   public synchronized void depositar(double valor) {
      if (valor > 0) {
         this.saldo += valor;
      } else {
         System.out.println("Valor inválido para depósito.");
      }
   }

   public double getSaldo() {
      return saldo;
   }

   public void setSaldo(double saldo) {
      this.saldo += saldo;
   }
}

class Transacao extends Thread {

   Conta conta;

   Transacao(Conta c) {
      this.conta = c;
   }

   @Override
   public void run() {

      try {
         sleep(500);
         System.out.println("\n" + this.getName() + " realizando o depósito...");
         conta.depositar(500);
         System.out.println("Depósito realizado...");
         System.out.println(conta.getSaldo() + "\n");
      } catch (InterruptedException e) {
         e.printStackTrace();
      }
   }
}

public class ExemploThreadsSynchronized {

   public static void main(String[] args) {
      Conta conta = new Conta("1234");
      Transacao t1 = new Transacao(conta);
      Transacao t2 = new Transacao(conta);
      t1.run();
      t2.run();

   }

}
