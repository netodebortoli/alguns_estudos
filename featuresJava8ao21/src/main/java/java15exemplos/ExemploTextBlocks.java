package java15exemplos;

public class ExemploTextBlocks {
    public static void main(String[] args) {
        // Text Block
        String blocoTexto = """
                <html>
                    <body>
                        <span>example text</span>
                    </body>
                </html>
                """;
        System.out.println(blocoTexto);

        // Text Block com parâmetros, uso de aspas
        // Uso de espace \ para não quebrar a linha
        String param1 = "param1";
        String param2 = "param2";
        blocoTexto = """
            Isso é um texto block \
            "Ola mundo"
                My parameter one: %s
                My parameter two: %s
                """.formatted(param1, param2);
        System.out.println(blocoTexto);
    }

}
