package lsp.errado;

import lsp.correto.Conta;

public class ContaEstudante extends ContaComum {
    public ContaEstudante(double saldo, String titular) {
        super(saldo, titular);
    }

    @Override
    public void rende() {
        throw new RuntimeException("Conta-estudante não pode render");
    }
}
