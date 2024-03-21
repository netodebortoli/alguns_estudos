package abstractfactory;

import abstractfactory.produtos.Cadeira;
import abstractfactory.produtos.Mesa;

public class App {
    public static void main(String[] args) {
        // A nível de aplicação, normalmente é no inicialização em que se declara e instancia o tipo da fábrica
        // Este exemplo aborda de forma simplificada a criação de móveis futurísticos e vintage

        // Declara a fábrica e os produtos abstratos
        AbstractFactoryMoveis factory;
        Cadeira cadeira;
        Mesa mesa;

        // Criação de produtos futurísticos
        factory = new FactoryMoveisFuturisticos();
        cadeira = factory.criarCadeira();
        mesa = factory.criarMesa("azul");

        cadeira.formato();
        mesa.formato();

        System.out.println("--------------");

        // Criação de produtos vintage
        factory = new FactoryMoveisVintage();
        cadeira = factory.criarCadeira();
        mesa = factory.criarMesa("vermelha");

        cadeira.formato();
        mesa.formato();

    }
}
