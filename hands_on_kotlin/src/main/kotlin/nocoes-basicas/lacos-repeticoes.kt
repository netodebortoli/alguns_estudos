package org.aristides_debortoli.`nocoes-basicas`

fun main() {

    // Define uma lista de Inteiros
    val minhaLista: List<Int> = listOf(1,4,3,5,10)
    println("Percorrendo minha Lita")
    for (int in minhaLista) {
        print("$int, ")
    }

    // Laço For de 0 a 10
    println("\nLaço for em um range de 0-10, excluindo 10")
    for (i in 0 ..< 10 ) {
        print("$i, ")
    }

    println("\nLaço for em um range de 0-10, pulando de 2 em 2")
    for (i in 0 .. 10 step 2 ) {
        print("$i, ")
    }

    println("\nLoop While descrente, de 10 a 1")
    var rep = 10
    while (rep > 0) {
        print("$rep, ")
        rep--
    }

}