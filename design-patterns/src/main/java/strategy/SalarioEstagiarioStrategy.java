package strategy;

public class SalarioEstagiarioStrategy implements SalarioStrategy {
    @Override
    public double calcularSalario(Double salarioBase) {
        return salarioBase * 1.05;
    }
}
