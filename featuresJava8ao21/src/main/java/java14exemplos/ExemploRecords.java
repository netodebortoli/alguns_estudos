package java14exemplos;

import java.util.Objects;

public class ExemploRecords {
   public static void main(String[] args) {
      Pessoa p = new Pessoa("Jonas", "jonas@email.com");
      Endereco e = new Endereco("Rua 23 de Março", "São Paulo");

      System.out.println(p);
      System.out.println(e);

      e = new Endereco(e.rua(), "7", e.cidade());
      System.out.println(e);

      // Lança exceção => nome e email não podem ser nulos
      // p = new Pessoa(null, null);
   }
}

record Pessoa(String nome, String email) {
   Pessoa {
      Objects.requireNonNull(nome);
      Objects.requireNonNull(email);
   }
}

record Endereco(String rua, String numero, String cidade) {
   Endereco(String rua, String cidade) {
      this(rua, "N/A", cidade);
   }
}