package org.aristides_debortoli.`nocoes-basicas`

import kotlin.math.pow

// Funcao básica. Com retorno de função e tipagem
fun soma(num1: Int, num2: Int): Int {
    return num1 + num2;
}

// Function Expression
// Nao é preciso uso de Chaves { }
// O tipo de retorno é inferido
fun potenciaDe2(num1: Double, num2: Double) = num1.pow(num2).toInt()
fun concatena(s1: String, s2: String) = "$s1 $s2"

fun main() {
    println("A soma de 10 + 15 é = ${soma(10, 15)}")
    println("2 elevado a 10 é igual a ${potenciaDe2(2.0, 10.0)}")
    val s1 = (concatena(s1 = "Ola", s2 = "mundo"))
    println(concatena(s1 = s1, s2 = "como vai?"))
}