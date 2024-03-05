package java21exemplos;

import java.math.BigDecimal;

public class ExemploSwitchPatternMatching {

    record User(String nome, String email, String endereco) {}
    public static void main(String[] args) {
        var usuario = new User("Jsv4", "js.com", "Brasil/Es");
        isUsuario(usuario);
        isUsuario(null);
        isUsuario( new BigDecimal(10));
    }

    private static void isUsuario(Object obj) {
        // Pattern Matching com Switch e desestruturação de objeto atráves do Record Pattern
        switch (obj) {
            case null -> System.out.println("Objeto e nulo");
            case User(String nome, String email, String endereco) ->
                    System.out.println("Nome= " + nome + ", email= " + email + ", endereco= " + endereco);
            default -> System.out.println("Tipo nao encontrado");
        }
    }

}
