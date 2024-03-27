package ocp.errado;

public class Produto {
    private double valor;
    private String nome;

    public Produto(double valor, String nome) {
        this.valor = valor;
        this.nome = nome;
    }

    public double getValor() {
        return valor;
    }

    public String getNome() {
        return nome;
    }
}
