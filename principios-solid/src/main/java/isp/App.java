package isp;

import java.util.List;

public class App {
    public static void main(String[] args) {
        List<Imposto> impostos = List.of(new ICMS(), new IPTU());
        for (var imp : impostos) {
            System.out.println(imp.definirValorImposto(100.0));
        }
    }
}
