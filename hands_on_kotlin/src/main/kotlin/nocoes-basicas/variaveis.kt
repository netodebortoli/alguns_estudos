package org.aristides_debortoli.`nocoes-basicas`

fun main() {
    // Val = tipo constante
    val meuInteiro: Int = 50
    // meuInteiro = 100 -> error

    // Var = tipo variável
    var minhaVariavel: Long
    minhaVariavel = 50000L

    // Inferencia de Tipagem
    var minhaString = "Ola, mundo"

    println(meuInteiro)
    println(minhaVariavel)

    // Concatenação de Strings
    var concatenaString = "Estou" + " " + "Estudando" + " " +  "Kotlin"

    // Interpolação de Strings
    println("$minhaString, como vai?")

    println(concatenaString)

    // Interpolação de variaveis com operação matematica
    println("$meuInteiro ao quadrado é igual = ${meuInteiro * meuInteiro}")

}
