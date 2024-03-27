package srp.correto;

public enum Cargo {
    DESENVOLVEDOR(new DezOuVintePorCento()),
    DBA(new QuinzeOuVinteCincoPorCento());

    private RegraCalculo regra;

    Cargo(RegraCalculo regra) {
        this.regra = regra;
    }

    public RegraCalculo getRegra() {
        return regra;
    }

}
