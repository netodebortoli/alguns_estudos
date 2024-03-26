package ocp;

public class TabelaPrecoBrasil implements TabelaDePreco {
    @Override
    public double descontoPara(double valor) {
        if (valor > 1000) return 0.07;
        if (valor > 5000) return 0.05;
        return 0;
    }
}
