package isp.errado;

public class NotaFiscalFisica implements GeradorNotaFiscal {

    @Override
    public Double definiValorNota(double valorBase) {
        return valorBase * 0.18;
    }

    @Override
    public void enviaEmail() {
        throw new RuntimeException("Não é possível enviar e-mail de uma NotaFiscal Física.");
    }
}
