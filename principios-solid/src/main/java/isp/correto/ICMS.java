package isp.correto;

public class ICMS implements Imposto, SalvarImposto {
    @Override
    public Double definirValorImposto(double valorBase) {
        return valorBase * 0.18;
    }

    @Override
    public void salvarNota() {
        System.out.println("Salvando documento ICMS...!");
    }

    @Override
    public void imprimirNota() {
        System.out.println("Imprimindo ICMS...!");
    }
}
