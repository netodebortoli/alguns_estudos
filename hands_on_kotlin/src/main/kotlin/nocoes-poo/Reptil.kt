package org.aristides_debortoli.`nocoes-poo`

abstract class Reptil(protected var membrosInferiores: Boolean) {

    abstract fun andar(): String

    fun isPossuiMembrosInferiores() = membrosInferiores
}