package factorymethod;

public class Gol implements Carro {

    private String nome = "Gol";

    private Boolean isVelho = false;

    @Override
    public void setVelho() {
        this.isVelho = true;
    }

    @Override
    public Boolean isVelho() {
        return isVelho;
    }

    @Override
    public void consertarCarro() {
        System.out.println("Carro consertado");
        this.isVelho = false;
    }

    @Override
    public String getNome() {
       return this.nome;
    }

    @Override
    public void exibirInfo() {
        System.out.println("Modelo: "+ getNome() + " - Fabricante: Volkswagen");
    }
}
