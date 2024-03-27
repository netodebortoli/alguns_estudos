package lsp.correto;

public class ContaCorrente {

    private Conta conta;

    public ContaCorrente(Conta conta) {
        this.conta = conta;
    }

    public void deposita(double valor) {
        conta.deposita(valor);
    }

    public void saca(double valor) {
        conta.saca(valor);
    }

    public double getSaldo() {
        return conta.getSaldo();
    }

    public void rende() {
        conta.rende();
    }
}
