package factorymethod;

public class App {
    public static void main(String[] args) {
        // Instancia de um Carro e da Factory
        Carro carro;
        FabricaCarros factory;

        // Factory Volks
        factory =  new FabricaVolks();
        carro = factory.criarCarro();
        carro.exibirInfo();
        factory.verificarCarro(carro);

        // Factory Chevrolet
        factory = new FabricaChevrolet();
        carro = factory.criarCarro();
        carro.exibirInfo();
        carro.setVelho();
        factory.verificarCarro(carro);
    }
}
