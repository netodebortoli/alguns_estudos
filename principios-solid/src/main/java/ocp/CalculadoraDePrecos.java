package ocp;

public class CalculadoraDePrecos {

    private TabelaDePreco tabela;
    private ServicoDeEntrega entrega;

    public CalculadoraDePrecos(TabelaDePreco tabela, ServicoDeEntrega entrega) {
        this.tabela = tabela;
        this.entrega = entrega;
    }

    public double calcula(Produto produto) {
        double desconto = tabela.descontoPara(produto.getValor());
        double frete = entrega.para(produto.getCidade());
        return produto.getValor() * (1-desconto) + frete;
    }
}
