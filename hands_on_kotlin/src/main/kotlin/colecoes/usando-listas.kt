package org.aristides_debortoli.colecoes

fun main() {
    val aList: List<Int> = listOf(1,2,3,4)

    println(aList.size) // tamanho
    println(aList.get(2)) // recupera na posição 2
    println(aList[3]) // recuperação no indice 3

    val find3 = aList.indexOf(3) // returna o indice do valor 3 (se houver)
    println(find3)

    val subList = aList.subList(1,3) // retorna uma sublist do indice(inclusivo) para(exclusivo) => [2,3]
    println(subList)

    var aList2 = aList.plus(5) // retorna uma nova lista com o valor 5 no final: [1,2,3,4,5]
    aList2 = aList2.plus(aList2) // retorna uma nova lista com os valores [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
    println(aList2)

    // Listas mutáveis

    println("Listas mutáveis")

    val mutableList= mutableListOf(1,2,3,4,5,6)
    println(mutableList)

    mutableList.set(2, 99) // altera o item da posição 2 para o valor 99
    mutableList[3] = 99 // mesma aplicação anterior
    println(mutableList)

}