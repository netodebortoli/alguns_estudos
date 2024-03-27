package ocp.correto;

public class ServicoEntregaSudeste implements ServicoDeEntrega {
    @Override
    public double para(String cidade) {
        if ("SAO PAULO".equalsIgnoreCase(cidade)) {
            return 20;
        }
        return 30;
    }
}
