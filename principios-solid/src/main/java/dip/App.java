package dip;

public class App {
    public static void main(String[] args) {
        MetodoPagamento cash = new Cash();
        MetodoPagamento creditCard = new CreditCard();

        Pessoa p1 = new Pessoa(cash);
        Pessoa p3 = new Pessoa(creditCard);

        p1.pay(55.92);
        p3.pay(32.21);
    }
}
