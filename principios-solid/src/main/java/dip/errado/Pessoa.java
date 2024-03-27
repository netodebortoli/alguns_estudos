package dip.errado;

public class Pessoa {
    private CreditCard creditCard;

    public void pay(double amount) {
        this.creditCard.pay(amount);
    }

    public Pessoa(CreditCard creditCard) {
        this.creditCard = creditCard;
    }
}
