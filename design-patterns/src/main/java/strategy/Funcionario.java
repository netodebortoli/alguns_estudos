package strategy;

public class Funcionario {
    private final String nome;
    private double salario;
    private Cargo cargo;
    private SalarioStrategy strategy;

    public Funcionario(String nome, double salario, Cargo cargo) {
        this.nome = nome;
        this.salario = salario;
        this.cargo = cargo;
        this.strategy = cargo.getSalarioStrategyFromCargo(cargo);
    }

    public double calcularSalario() {
        return strategy.calcularSalario(this.salario);
    }

    public void promoverFuncionario(Double novoSalario, Cargo novoCargo) {
        this.salario = novoSalario;
        this.cargo = novoCargo;
        this.strategy = novoCargo.getSalarioStrategyFromCargo(novoCargo);
    }

    @Override
    public String toString() {
        return "Funcionário{" +
                "Nome='" + this.nome + '\'' +
                ", Cargo=" + this.cargo +
                ", Salário Base=" + this.salario +
                ", Salário com Reajuste=" + this.calcularSalario() +
                '}';
    }
}
