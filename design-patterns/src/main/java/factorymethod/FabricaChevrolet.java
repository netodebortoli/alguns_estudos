package factorymethod;

public class FabricaChevrolet extends FabricaCarros {
    @Override
    Carro criarCarro() {
        return new Onix();
    }
}
