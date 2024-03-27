package isp.errado;

// Interface Gorda -> possui muitas responsabilidades
public interface GeradorNotaFiscal {
    Double definiValorNota(double valorBase);
    void enviaEmail();
}
