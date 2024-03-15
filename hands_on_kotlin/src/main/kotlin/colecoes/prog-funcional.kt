package org.aristides_debortoli.colecoes

fun main() {

    // Declaro uma lista de inteiros
    val list = listOf(2, 3, 4, 5, 6, 7)
    // Function Value (Lambda)
    val funNumerosPares = { num: Int -> num % 2 == 0 }

    val list_v2 = list.map({ value: Int -> value.times(value) })
    val list_v3 = list.map { value: Int -> value.times(value) }
    val list_v4 = list.map { value -> value.times(value) }
    val list_v5 = list.map { it.times(it) }

    // Encadeando funções
    val list_v6 = list.map { it.times(it) }.filter { value: Int -> value % 2 == 0 }
    val list_v7 = list.map { it.times(it) }.filter { funNumerosPares(it) }
    val list_v8 = list.map { it.times(it) }.filter { funNumerosPares(it) }.reversed()
    val list_v9 = list.reduce { a, b -> a + b }

    println(list)
    println(list_v2)
    println(list_v3)
    println(list_v4)
    println(list_v5)
    println(list_v6)
    println(list_v7)
    println(list_v8)
    println(list_v9)
}