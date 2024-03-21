package abstractfactory.produtos;

public class CadeiraVintage implements Cadeira {
    @Override
    public void formato() {
        System.out.println("Cadeira vintage possui 4 pernas e é feita de madeira");
    }
}
