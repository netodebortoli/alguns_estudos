package ocp;

public class Produto {
    private double valor;
    private String cidade;

    public Produto(double valor, String cidade) {
        this.valor = valor;
        this.cidade = cidade;
    }

    public double getValor() {
        return valor;
    }

    public String getCidade() {
        return cidade;
    }
}
