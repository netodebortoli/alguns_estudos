package dip.correto;

public class Cash implements MetodoPagamento {
    @Override
    public boolean pay(double amount) {
        System.out.println("Paying " + amount + " using cash.");
        return true;
    }
}
