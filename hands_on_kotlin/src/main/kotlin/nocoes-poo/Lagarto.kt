package org.aristides_debortoli.`nocoes-poo`

class Lagarto(private val possuiVeneno: Boolean) :
    Reptil(true), SangueFrio, Carnivoro {

    fun isVenenoso(): Boolean {
        return possuiVeneno
    }

    override fun comer(animal: Animal): String {
        return "Este ${animal.nome} está saboroso!"
    }

    override fun andar(): String {
        return "Estou andando na floresta atrás de algum animal frágil!"
    }
}