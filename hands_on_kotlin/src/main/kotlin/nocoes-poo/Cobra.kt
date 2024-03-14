package org.aristides_debortoli.`nocoes-poo`

// Recebe um valor booleano ao Instanciar um Objeto do tipo Cobra
// Cobra é um tipo de Reptil e que nao possui membros inferiores
class Cobra(private val possuiVeneno: Boolean) :
    Reptil(false), Carnivoro, SangueFrio {

    override fun comer(animal: Animal): String {
        return "Comendo o animal ${animal.nome}"
    }

    // Function Expression
    override fun andar() = "Eu não ando! Estou rastejando"
    // fun isVenenosa() = possuiVeneno

    fun isVenenosa(): Boolean {
        return possuiVeneno
    }
}