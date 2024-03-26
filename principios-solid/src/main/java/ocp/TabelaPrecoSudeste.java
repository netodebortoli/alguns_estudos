package ocp;

public class TabelaPrecoSudeste implements TabelaDePreco {
    @Override
    public double descontoPara(double valor) {
        if (valor > 1000) return 0.05;
        if (valor > 5000) return 0.03;
        return 0;
    }
}
