package lsp.errado;

public class ContaComum {
    private double saldo;
    private String titular;

    public ContaComum(double saldo, String titular) {
        this.saldo = saldo;
        this.titular = titular;
    }

    public void deposita(double valor) {
        this.saldo += valor;
    }

    public void saca(double valor) {
        if (valor <= this.saldo) {
            this.saldo -= valor;
        } else {
            throw new RuntimeException("Saldo insuficiente");
        }
    }

    public void rende() {
        this.saldo *= 1.1;
        System.out.println(
                String.format("Novo saldo: R$%.2f", this.saldo)
        );
    }
}
