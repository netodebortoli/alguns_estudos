package lsp.correto;

public class Conta {
    private double saldo;
    private String titular;

    public Conta(double saldo, String titular) {
        this.saldo = saldo;
        this.titular = titular;
    }

    public void deposita(double valor) {
        if (valor < 0) {
            throw new IllegalArgumentException("Valor negativo");
        }
        this.saldo += valor;
    }

    public void saca(double valor) {
        if (valor > this.saldo) {
            throw new IllegalArgumentException("Saldo insuficiente");
        }
        this.saldo -= valor;
    }

    public void rende() {
        this.saldo *= 1.02;
    }

    public double getSaldo() {
        return saldo;
    }

    @Override
    public String toString() {
        return "Conta{" +
                "saldo=" + saldo +
                ", titular='" + titular + '\'' +
                '}';
    }
}
