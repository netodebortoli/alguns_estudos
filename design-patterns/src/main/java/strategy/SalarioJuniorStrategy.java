package strategy;

public class SalarioJuniorStrategy implements SalarioStrategy {
    @Override
    public double calcularSalario(Double salarioBase) {
        return salarioBase * 1.2 + 200;
    }
}
