package org.aristides_debortoli.`nocoes-poo`

fun main() {
    // objetos do tipo Eu
    val eu = Eu
    val outroEu = Eu

    println(eu.minhaApresentacao())
    println(outroEu.minhaApresentacao())
    println(eu.equals(outroEu))

    val dog = Cachorro("Vira lata")

    println(Cachorro.amorIncondicional)
    println(Cachorro.feliz)
    println(Cachorro.brinca())
    /* Error! Os atributos de ObjectCompanion da Clase Cachorra são acessados apenas pela Classe e nao pelo objeto
        dog.feliz
        dog.amorIncondicional
        dog.brinca() */
}