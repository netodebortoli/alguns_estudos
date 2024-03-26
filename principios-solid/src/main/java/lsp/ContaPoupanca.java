package lsp;

public class ContaPoupanca extends Conta {
    public ContaPoupanca(double saldo, String titular) {
        super(saldo, titular);
    }

    @Override
    public void rende() {
        throw new RuntimeException("Conta-Poupança Não pode render");
    }
}
