package factorymethod;

public abstract class FabricaCarros {

    // Método Fábrica de Carros
    abstract Carro criarCarro();

    // Classe de fábrica não se restringe apenas com criação de objetos
    // Algumas factorys possuem lógica de négocio associado ao tipo do objeto
    public void verificarCarro(Carro carro) {
        if (carro.isVelho()) {
            System.out.println("Carro com defeito: " + carro.getNome());
            System.out.println("Levando o carro para a oficina...");
            carro.consertarCarro();
        } else {
            System.out.println("Carro sem defeito: " + carro.getNome());
        }
    }
}
