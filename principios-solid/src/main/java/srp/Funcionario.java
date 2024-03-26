package srp;

public class Funcionario {
    private Cargo cargo;
    private double salarioBase;

    public Funcionario(Cargo cargo, double salarioBase) {
        this.cargo = cargo;
        this.salarioBase = salarioBase;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public double getSalarioBase() {
        return salarioBase;
    }

    @Override
    public String toString() {
        return "Funcionario{" +
                "cargo=" + cargo +
                ", salarioBase=" + salarioBase +
                ", salarioLiquido=" + cargo.getRegra().calcula(this) +
                '}';
    }
}
