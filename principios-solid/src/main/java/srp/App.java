package srp;

public class App {
    public static void main(String[] args) {
        Funcionario funcionario1 = new Funcionario(Cargo.DESENVOLVEDOR, 2000.0);
        Funcionario funcionario2 = new Funcionario(Cargo.DBA, 3000.0);
        System.out.println(funcionario1);
        System.out.println(funcionario2);
    }
}
