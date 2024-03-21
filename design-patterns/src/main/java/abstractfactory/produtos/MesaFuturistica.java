package abstractfactory.produtos;

public class MesaFuturistica implements Mesa {

    private final String cor;

    public MesaFuturistica(String cor) {
        this.cor = cor;
    }

    @Override
    public String getCor() {
        return this.cor;
    }

    @Override
    public void formato() {
        System.out.println("Formato Mesa Futuristica: redonda com bordas da cor " + this.cor + " e com luzes de LED");
    }

    @Override
    public void possuiPernas() {
        System.out.println("Mesa futuristica: não possui pernas");
    }
}
