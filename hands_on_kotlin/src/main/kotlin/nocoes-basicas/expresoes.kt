package org.aristides_debortoli.`nocoes-basicas`

fun main() {
    // Expressao booleana
    val aCondition = 1 > 2

    // Instrucao if
    if (aCondition) {
        println("A condição é verdadeira")
    } else {
        println("A condição é falsa")
    }

    // de ... para ==> Operador ternário em Java
    val expressaoIf = if (aCondition) 42 else 999

    // Instrução when
    val value: Int = 39
    when (value) {
        42 -> println("the meaning of life from HGG")
        43 -> println("not the meaning of life, but quite close")
        else -> println("something else")
    }

    // Expressão When
    // de ... para ==> Switch Expression em Java
    val myNewValue = when(value) {
        40 -> println("Valor é 40")
        42 -> println("Valor é maior que 40")
        else -> println("Valor é menor que 40")
    }

}