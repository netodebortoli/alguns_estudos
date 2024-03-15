package org.aristides_debortoli.colecoes

fun main() {
    // Declara um Set.
    // Os valores duplicados não são inseridos
    val mySet = setOf(1,2,3,4,1,2,3)
    println(mySet)

    // Set contém o valor 1?
    println(mySet.contains(1))
    // Set contém o valor 9?
    println(9 in mySet)

    val add7 = mySet.plus(7) // novo set: [1,2,3,4,7]
    val without3 = mySet.minus(1) // novo set: [1,2,4]
    println(add7)
    println(without3)

    // ADicionado uma nova lista ao set
    println(mySet.plus(listOf(5,5,6,7)))
    println(mySet.containsAll(listOf(1,2,3)))

    println("\nSets mutáveis")
    val mutableSet = mutableSetOf(1,2,3,4,1,2,3)
    mutableSet.add(99)
    println(mutableSet)
    mutableSet.removeAll(listOf(1,2,3))
    println(mutableSet)

}