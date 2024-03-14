package org.aristides_debortoli.`nocoes-poo`

open class Animal {
    // Atributos/Propriedades
    val idade = 0;
    lateinit var nome: String;

    // Comportamentos/Métodos
    open fun come() = println("Estou comendo")
    fun anda() = println("Estou andando")

    //fun envelhece() = idade++ => error
}