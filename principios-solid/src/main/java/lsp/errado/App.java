package lsp.errado;

import java.util.List;

public class App {
    public static void main(String[] args) {
        // ContaEstudante não pode render
        List<ContaComum> contas = List.of(
                new ContaComum(100.0, "Pessoa 1"),
                new ContaComum(150.0, "Pessoa 2"),
                new ContaComum(200.0, "Pessoa 3"),
                new ContaEstudante(200.0, "Pessoa 4"));

        for (var conta : contas) {
            conta.rende();
        }
    }
}
