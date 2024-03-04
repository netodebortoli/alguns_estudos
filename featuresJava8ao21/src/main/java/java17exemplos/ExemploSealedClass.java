package java17exemplos;

public class ExemploSealedClass {
    public static void main(String[] args) {
        Inseto f = new Formiga(true, "operaria");
        SerVivo p = new Pessoa("Jose");

        System.out.println(p);
        System.out.println(f);
    }
}

sealed interface SerVivo permits Animal, Inseto, Pessoa {
    String getName();

}

final class Pessoa implements SerVivo {

    private final String name;

    public Pessoa(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "Pessoa{" +
                "name='" + name + '\'' +
                '}';
    }
}

final class Animal implements SerVivo {
    private String name;
    @Override
    public String getName() {
        return name;
    }
}

sealed interface Inseto extends SerVivo permits Formiga {
    boolean possuiAntena();
}

record Formiga(boolean possuiAntena, String name) implements Inseto {

    @Override
    public String getName() {
        return name;
    }

    @Override
    public boolean possuiAntena() {
        return this.possuiAntena;
    }

    @Override
    public String toString() {
        return "Formiga{" +
                "possuiAntena=" + possuiAntena +
                ", name='" + name + '\'' +
                '}';
    }
}

/*
// Nâo compila.
// Vírus não é permitido implementar a interface SerVivo
class Virus implements SerVivo() {

}
*/

