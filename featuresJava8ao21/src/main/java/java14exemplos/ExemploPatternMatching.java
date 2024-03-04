package java14exemplos;

abstract class Veiculo {
    protected String name;

    Veiculo(String name) {
        this.name = name;
    }

    String getName() {
        return this.name;
    }
}

class Caminhao extends Veiculo {
    public Caminhao(String name) {
        super(name);
    }

    public String conduzir() {
        return "Conduzindo o caminhão";
    }

    @Override
    public String toString() {
        return "Caminhao{" +
                "name='" + name + '\'' +
                '}';
    }
}

class Carro extends Veiculo {
    public Carro(String name) {
        super(name);
    }

    public String dirige() {
        return "Dirigindo o carro";
    }

    @Override
    public String toString() {
        return "Carro{" +
                "name='" + name + '\'' +
                '}';
    }
}

class Moto extends Veiculo {
    public String pilota() {
        return "Pilotando a moto";
    }
    public Moto(String name) {
        super(name);
    }

    @Override
    public String toString() {
        return "Moto{" +
                "name='" + name + '\'' +
                '}';
    }
}

public class ExemploPatternMatching {

    public static void main(String[] args) {
        Veiculo obj = new Carro("Golf GTI");
        exibe(obj);
        obj = new Moto("MT-03");
        exibe(obj);
        obj = new Caminhao("Actros");
        exibe(obj);
    }

    public static void exibe(Object obj) {
        System.out.println("\n" + obj);
        if (obj instanceof Carro carro && carro.name.equals("Golf GTI")) {
            System.out.println(carro.dirige());
        } else if (obj instanceof Moto moto && moto.name.equals("MT-03")) {
            System.out.println(moto.pilota());
        } else if (obj instanceof Caminhao caminhao && caminhao.name.equals("Axxor")) {
            System.out.println(caminhao.conduzir());
        } else {
            System.out.println("Tipo do veiculo não encontrado");
        }
    }

}
