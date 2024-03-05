package java21exemplos;

public class ExemploRecordPattern {

    record User(String nome, String email) {
    }
    public static void main(String[] args) {

        var user = new User("Js", "email.com");
        isUser(user);
    }

    public static void isUser(Object obj) {
        // Java 17
        if (obj instanceof User u) {
            var nome = u.nome();
            var email = u.email();
            System.out.println("Nome: " + nome + ", email: " + email);
        }

        /*
            Java 21: Record Pattern
            Realiza a desestruturação do objeto, e posteriormente acessando os valores das variáives desestruturadas
        */
        if (obj instanceof User(String nome, String email)) {
            System.out.println("Nome: " + nome + ", email: " + email);
        }
    }

}