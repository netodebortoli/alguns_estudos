package lsp;

import java.util.List;

public class App {
    public static void main(String[] args) {
        ContaCorrente conta1 = new ContaCorrente(new Conta(100, "JONAS"));
        ContaEstudante conta2 = new ContaEstudante(new Conta(0, "CARLOS"));

        conta1.deposita(100);
        conta1.rende();
        conta2.deposita(100);
        conta2.saca(50);

        System.out.println("Saldo da conta 1: " + conta1.getSaldo());
        System.out.println("Saldo da conta 2: " + conta2.getSaldo());

        //// Exemplo de Quebra de Contrato
        // Conta-poupança não rende e sobrescreveu o método render
        Conta conta3 = new ContaPoupanca(1000.0, "JOAO");
        Conta conta4 = new Conta(2000.0, "MARIA");
        List<Conta> contas = List.of(conta3, conta4);

        for (Conta conta : contas) {
            conta.rende();
        }
    }
}
