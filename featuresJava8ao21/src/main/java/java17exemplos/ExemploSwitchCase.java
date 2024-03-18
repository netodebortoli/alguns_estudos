package java17exemplos;

public class ExemploSwitchCase {
    public static void main(String[] args) {
        System.out.println(
                switchExpression("Monday"));
        SerVivo obj = new Formiga(false, "operaria");
        switchWithPatternMatching(obj);
    }

    private static void switchWithPatternMatching(SerVivo obj) {
         /*
            Switch com Sealed Classe, Pattern Matching
            Todos os cases desse switch precisam ser comparados com as classes que herdam de SerVivo.
            Além disso, não é necessário o case 'default', pois o compilador já reconhece que todos os casos ja foram cobertos
         */
        switch (obj) {
            case Animal a when a.getName() == "operaria" -> System.out.println(a);
            case Pessoa p -> System.out.println(p);
            case Inseto i -> System.out.println(i);
            case null -> System.out.println("objeto é nulo");
        }
    }

    private static String switchExpression(String day) {
         /*
            Switch Expression, com múltiplos cases, arrow operator ao invés de break,
            e uso de switch como retorno de valor
         */
        return switch (day) {
            case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" -> "Week day";
            case "Saturday", "Sunday" -> "Weekend";
            default -> "Unknown";
        };
    }
}