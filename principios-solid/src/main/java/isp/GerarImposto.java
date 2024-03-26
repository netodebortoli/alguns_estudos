package isp;

// Interface Gorda -> possui mais uma responsabilidade
public interface GerarImposto {
    Double definirValorImposto(double valorBase);
    void salvarNota();
    void imprimirNota();
}
