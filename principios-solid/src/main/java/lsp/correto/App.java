package lsp.correto;

public class App {
    public static void main(String[] args) {
        ContaCorrente conta = new ContaCorrente(new Conta(100, "JONAS"));
        ContaEstudante conta2 = new ContaEstudante(new Conta(0, "CARLOS"));

        conta.deposita(100);
        conta.rende();
        conta2.deposita(100);
        conta2.saca(50);

        System.out.println("Saldo da conta 1: " + conta.getSaldo());
        System.out.println("Saldo da conta 2: " + conta2.getSaldo());
    }
}
