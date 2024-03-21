package strategy;

public enum Cargo {
    ESTAGIARIO,
    JUNIOR,
    PLENO,
    SENIOR;

    public SalarioStrategy getSalarioStrategyFromCargo(Cargo cargo) {
        return switch (cargo) {
            case ESTAGIARIO -> new SalarioEstagiarioStrategy();
            case JUNIOR -> new SalarioJuniorStrategy();
            case PLENO -> new SalarioPlenoStrategy();
            case SENIOR -> new SalarioSeniorStrategy();
        };
    }
}
