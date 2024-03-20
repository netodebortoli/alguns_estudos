package factorymethod;

public class FabricaVolks extends FabricaCarros {
    @Override
    Carro criarCarro() {
        return new Gol();
    }
}
