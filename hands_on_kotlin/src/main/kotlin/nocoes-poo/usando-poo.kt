package org.aristides_debortoli.`nocoes-poo`

fun main() {
    // Instanciação
    val gato = Animal()

    // Atribuição de valor ao atributo lateint
    gato.nome = "Pituco"

    // Uso de métodos/atributos
    println("Sou um gato de nome ${gato.nome} e tenho ${gato.idade} anos")
    gato.anda()
    gato.come()
}