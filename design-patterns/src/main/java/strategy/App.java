package strategy;

public class App {
    public static void main(String[] args) {
        Funcionario funcionario = new Funcionario("Aristides", 1000, Cargo.ESTAGIARIO);
        System.out.println(funcionario);
        funcionario.promoverFuncionario(3000.0,  Cargo.JUNIOR);
        System.out.println(funcionario);
        funcionario.promoverFuncionario(7000.0,  Cargo.PLENO);
        System.out.println(funcionario);
        funcionario.promoverFuncionario(15000.0,  Cargo.SENIOR);
        System.out.println(funcionario);
    }
}
