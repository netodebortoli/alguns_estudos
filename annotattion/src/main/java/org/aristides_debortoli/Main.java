package org.aristides_debortoli;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) throws InvocationTargetException, IllegalAccessException {
        Pessoa pessoa = new Pessoa("aristides", "debortoli", "25", "");

        System.out.println(
                new ObjectToJsonConverter().convertToJson(pessoa));

        System.out.println(
                Arrays.toString(pessoa.getClass().getAnnotations()));

        for (Method method : pessoa.getClass().getDeclaredMethods()) {
            if (method.isAnnotationPresent(WhoIam.class)) {
                WhoIam annotation = method.getAnnotation(WhoIam.class);
                int times = annotation.times() <= 0 ? 1 : annotation.times();
                for (int i = 0; i < times; i++) {
                    var s = method.invoke(pessoa);
                    System.out.println(s);
                }
            }
        }

        StringBuilder sb = new StringBuilder();

        for (Field field : pessoa.getClass().getDeclaredFields()) {
            if (field.isAnnotationPresent(Name.class)) {
                field.setAccessible(true);
                Object objectField = field.get(pessoa);
                if (objectField instanceof String stringField) {
                    sb.append(stringField.toUpperCase()).append(" ");
                }
            }
        }

        System.out.println(
                sb.toString().length() > 0 ? sb.toString().trim() : "Nenhum nome encontrado"
        );
    }
}