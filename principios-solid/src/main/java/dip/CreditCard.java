package dip;

public class CreditCard implements MetodoPagamento {
    @Override
    public boolean pay(double amount) {
        System.out.println("Paid from Credit Card: " + amount);
        return true;
    }
}
