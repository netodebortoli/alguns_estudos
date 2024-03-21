package strategy;

public class SalarioPlenoStrategy implements SalarioStrategy {
    @Override
    public double calcularSalario(Double salarioBase) {
        return salarioBase * 1.5 + 1000;
    }
}
