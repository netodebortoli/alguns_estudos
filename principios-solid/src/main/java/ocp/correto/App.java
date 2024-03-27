package ocp.correto;

public class App {
    public static void main(String[] args) {
        CalculadoraDePrecos calculadora = new CalculadoraDePrecos(
                new TabelaPrecoSudeste(),
                new ServicoEntregaSudeste());

        Produto celular = new Produto(1000.0, "São Paulo");
        System.out.println(calculadora.calcula(celular));

        Produto geladeira = new Produto(5500.0, "Salvador");

        calculadora = new CalculadoraDePrecos(
                new TabelaPrecoBrasil(),
                new ServicoEntregaSudeste());

        System.out.println(calculadora.calcula(geladeira));
    }
}
