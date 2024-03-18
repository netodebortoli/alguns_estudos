package java8exemplos;

import java.util.ArrayList;
import java.util.List;

public class ExemploLamdaEMethodReference {

    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        list.add(5);
        list.add(1);
        list.add(12);
        list.add(3);
        list.add(2);
        list.add(4);

        // Lambda com method reference.
        list.forEach(System.out::println);

        // Lambda implementando ordenação decrescente
        list.sort((o1, o2) -> {
            if (o1 > o2) {
                return -1;
            }
            else if (o2 > o1) {
                return 1;
            }
            else {return 0;}
        });

        System.out.println(list);

        // Lambda com method reference implementando ordenação crescente.
        list.sort(Integer::compare);
        System.out.println(list);
    }

}
