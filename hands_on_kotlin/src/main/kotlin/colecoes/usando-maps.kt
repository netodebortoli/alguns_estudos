package org.aristides_debortoli.colecoes

fun main() {

    val phonebook: Map<String, Int> = mapOf(
        Pair("Daniel", 123),
        "Alice" to 999 // mesma aplicação de Pair("Alice", 999)
    )

    println(phonebook)
    println(phonebook.get("Daniel")) // Recuperando valor via get()
    println(phonebook["Alice"]) // Recupera o valor via indexação

    // Adicionado com a classe Pair
    phonebook.plus(Pair("Mateus", 1))
    phonebook.plus("Jorge" to 12)

    println(phonebook.containsValue(1))

}