package dip;

public class Pessoa {
    private MetodoPagamento metodoPagamento;

    public void pay(double amount) {
        this.metodoPagamento.pay(amount);
    }

    public Pessoa(MetodoPagamento paymentMethod) {
        this.metodoPagamento = paymentMethod;
    }
}
