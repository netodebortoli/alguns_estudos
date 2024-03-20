package factorymethod;

public class Onix implements Carro {
    private String nome = "Onix";
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
    public void exibirInfo() {
        System.out.println("Modelo: " + getNome() + " - Fabricante: Chevrolet");
    }

    @Override
    public String getNome() {
        return this.nome;
    }
}
