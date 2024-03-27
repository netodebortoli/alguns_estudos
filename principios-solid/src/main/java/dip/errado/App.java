package dip.errado;

public class App {
    public static void main(String[] args) {
        // Errado. Pessoa não pode depender de outra implementação
        Pessoa pessoa = new Pessoa(new CreditCard());
        pessoa.pay(1000.0);
    }
}
