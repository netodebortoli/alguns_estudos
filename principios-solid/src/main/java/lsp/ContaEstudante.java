package lsp;

public class ContaEstudante {

    private Conta conta;

    public ContaEstudante(Conta conta) {
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
}
