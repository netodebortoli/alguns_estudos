package ocp.errado;

// Para cada regra de negócio, uma nova condição é adicionada ao metodo calcula.
// A classe está aberta para modificação, o que viola o princípio do Open/Closed Principle.
public class CalculadoraDePrecos {

    public static final int ENVIAR_SUL = 1;
    public static final int ENVIAR_SUDESTE = 2;
    public static final int ENVIAR_NORTE = 3;

    public double calcula(Produto produto, int regra) {

        double precoPrete = 0;

        switch (regra) {
            case ENVIAR_SUL:
                if (produto.getValor() > 1000) {
                    precoPrete = 0.05;
                }
                break;
            case ENVIAR_SUDESTE:
                if (produto.getValor() > 5000) {
                    precoPrete = 0.07;
                }
                break;
            case ENVIAR_NORTE:
                if (produto.getValor() > 10000) {
                    precoPrete = 0.10;
                }
                break;
        }

        return produto.getValor() * (1 + precoPrete);
    }
}
