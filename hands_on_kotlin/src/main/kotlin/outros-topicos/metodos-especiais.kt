package org.aristides_debortoli.`outros-topicos`

fun main() {
    val pessoa = Pessoa("Aristides", 25)
    println(pessoa.like("Guardiões da Galáxia"))

    // Método Infixo
    val result = pessoa like "Harry Potter"
    println(pessoa like "Guardiões da Galaxia")
    println(result)

    val vetor_1 = Vetor(5,10)
    val vetor_2 = Vetor(15, 20)

    // Chamada padrão ao método plus()
    val resultSoma = vetor_1.plus(vetor_2)

    // Chama ao método com operator
    val otherResult = vetor_1 + vetor_2

    println(resultSoma);
    println(otherResult);
}