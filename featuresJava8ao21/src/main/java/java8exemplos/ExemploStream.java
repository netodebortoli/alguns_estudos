package java8exemplos;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ExemploStream {

    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        list.add(5);
        list.add(1);
        list.add(0);
        list.add(3);
        list.add(2);
        list.add(4);

        List<Integer> newList = list.stream()
                .map(n -> n * n)
                .filter(n -> n % 2 != 0)
                .collect(Collectors.toList());

        System.out.println(newList);
    }
}
