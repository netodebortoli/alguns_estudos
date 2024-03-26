package isp;

public class ICMS implements Imposto, SalvarImposto {
    @Override
    public void salvarNota() {
        throw new RuntimeException("Não é possível salvar nota de OutroImposto");
    }

    @Override
    public Double definirValorImposto(double valorBase) {
        return valorBase * 0.25;
    }

    @Override
    public void imprimirNota() {
        throw new RuntimeException("Não é possível imprimir nota de OutroImposto");
    }
}
