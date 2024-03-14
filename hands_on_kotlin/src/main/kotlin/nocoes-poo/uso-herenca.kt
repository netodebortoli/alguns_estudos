package org.aristides_debortoli.`nocoes-poo`

fun main() {

    // Declara um Cachorro, mas nao Instancia
    var cachorro: Cachorro;

    // Instancia um Cachoro e atribui sua raça
    cachorro = Cachorro("Golden");
    cachorro.nome = "Amarelinho"

    cachorro.latir("Jose")

    // Declara outro objeto do Tipo Animal, mas implementado pela classe Cachorro
    val outroCao: Animal = Cachorro("Vira-lata")
    outroCao.nome = "Caramelinho"

    outroCao.come()
    // outroCao.latir() => error! O objeto do tipo Animal nao tem o metodo latir
}