package org.aristides_debortoli.`outros-topicos`

data class Pessoa(val nome: String, val idade: Int) {
    infix fun like(filme: String) = "$nome ama o filme $filme"
}

