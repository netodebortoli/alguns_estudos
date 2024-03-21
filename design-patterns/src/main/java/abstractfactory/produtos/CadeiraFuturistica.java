package abstractfactory.produtos;

public class CadeiraFuturistica implements Cadeira {
    @Override
    public void formato() {
        System.out.println("Cadeira futuristica não possui pernas e flutua no ar");
    }
}
