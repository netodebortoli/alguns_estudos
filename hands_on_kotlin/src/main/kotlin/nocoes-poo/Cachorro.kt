package org.aristides_debortoli.`nocoes-poo`

class Cachorro(val raca: String): Animal() {

    fun latir(pessoa: String) = println("wof wof! Pessoa $pessoa não é conhecida")
    override fun come() = println("Estou comendo, ta olhando o quê?")

    // Atributos e Métodos Objects
    // Pertecem a classe Cachorro e não a o objeto que implementar Cachorro
    companion object Amigo  {
        val amorIncondicional = "Sempre amarei o meu companheiro"
        val feliz = "Eu amo brincar com o meu companheiro"

        fun brinca(): String {
            return "Estou brincando"
        }
    }
}