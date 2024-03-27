package srp.errado;

public class Funcionario {
    private String nome;
    private Cargo cargo;
    private double salarioBase;
    private double salarioReajustado;

    // Muitas reponsabilidades para a classe Funcionario
    public Funcionario(Cargo cargo, double salarioBase, String nome) {
        this.nome = nome;
        this.cargo = cargo;
        this.salarioBase = salarioBase;
    }

    public void reajusteSalarial() {
        if (cargo.equals(Cargo.DESENVOLVEDOR)) {
            if (salarioBase > 3000) {
                this.salarioReajustado += salarioBase * 0.8;
            } else {
                this.salarioReajustado += salarioBase * 0.9;
            }
            return;
        }

        if (cargo.equals(Cargo.DBA)) {
            if (salarioBase > 2500) {
                this.salarioReajustado += salarioBase * 0.75;
            } else {
                this.salarioReajustado += salarioBase * 0.85;
            }
            return;
        }

        throw new RuntimeException("Cargo não encontrado");
    }

    public Cargo getCargo() {
        return cargo;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }

    public double getSalarioBase() {
        return salarioBase;
    }

    public void setSalarioBase(double salarioBase) {
        this.salarioBase = salarioBase;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public String toString() {
        return "Funcionario{" +
                "nome='" + nome + '\'' +
                ", cargo=" + cargo +
                ", salarioBase=" + salarioBase +
                ", salarioReajustado=" + salarioReajustado +
                '}';
    }
}
