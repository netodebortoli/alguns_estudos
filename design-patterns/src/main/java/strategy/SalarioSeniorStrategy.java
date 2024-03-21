package strategy;

public class SalarioSeniorStrategy implements SalarioStrategy {
    @Override
    public double calcularSalario(Double salarioBase) {
        return salarioBase * 1.5 + 2000;
    }
}
