package isp.errado;

public class NotaFiscalEletronica implements GeradorNotaFiscal {
    @Override
    public Double definiValorNota(double valorBase) {
        return valorBase * 0.35;
    }

    @Override
    public void enviaEmail() {
        System.out.println("Enviando email.");
    }
}
