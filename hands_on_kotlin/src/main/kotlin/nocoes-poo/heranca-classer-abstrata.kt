package org.aristides_debortoli.`nocoes-poo`

fun main() {
    val rato = Animal()
    rato.nome = "Ratazana Loca"
    val bichoPreguica = Animal()
    bichoPreguica.nome = "Bicho preguiça"

    val anaconda = Cobra(false)
    println("A cobra anaconda possui veneno? " +
            if (anaconda.isVenenosa()) "sim" else "não")
    println("Cobra, por que vc esta andando? ${anaconda.andar()}")
    println("O que vc está comendo, cobra? ${anaconda.comer(rato)} ")

    val dragaoComodo = Lagarto(true)
    println("Onde vc está indo Dragao de Comodo?")
    println(dragaoComodo.andar())
    println("O que vc está comendo, Dragao de Comodo? ${dragaoComodo.comer(bichoPreguica)} ")

}