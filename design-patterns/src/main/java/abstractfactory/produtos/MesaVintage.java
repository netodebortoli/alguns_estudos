package abstractfactory.produtos;

public class MesaVintage implements Mesa {

    private final String cor;

    public MesaVintage(String cor) {
        this.cor = cor;
    }

    @Override
    public String getCor() {
        return this.cor;
    }

    @Override
    public void formato() {
        System.out.println("Formato Mesa Vintage: quadrada com cor " + this.cor + " e com detalhes em madeira");
    }

    @Override
    public void possuiPernas() {
        System.out.println("Mesa Vintage: possui com 4 pernas");
    }
}
