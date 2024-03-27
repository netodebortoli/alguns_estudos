package dip.correto;

public class App {
    public static void main(String[] args) {
        MetodoPagamento cash = new Cash();
        MetodoPagamento creditCard = new CreditCard();

        Pessoa p1 = new Pessoa(cash);
        Pessoa p3 = new Pessoa(creditCard);

        p1.pay(100.0);
        p3.pay(50.0);
    }
}
