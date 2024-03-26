package isp;

public class IPTU implements Imposto {
    @Override
    public Double definirValorImposto(double valorBase) {
        return valorBase * 0.35;
    }
}
