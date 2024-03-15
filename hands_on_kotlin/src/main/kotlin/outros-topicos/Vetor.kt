package org.aristides_debortoli.`outros-topicos`

data class Vetor(val x: Int, val y: Int) {
    operator fun plus(outro: Vetor) =
        Vetor(x + outro.x, y + outro.y)

    operator fun get(index: Int): Int =
        when (index) {
            0 -> x
            1 -> y
            else -> throw IllegalArgumentException("Vetor possui apenas 2 coordenadas!")
        }
}
