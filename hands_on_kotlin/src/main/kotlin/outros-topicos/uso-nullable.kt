package org.aristides_debortoli.`outros-topicos`

fun main() {

//    val pessoa: Pessoa = null; // Não compila
//    val nomePessoa = pessoa.nome; // Não compila

    val pessoa: Pessoa? = null;
    val nomePessoa = pessoa?.nome // pessoa?. ainda pode ser nulo, logo nome também é !
    val nomeFinal = pessoa?.nome ?: "Pessoa não instaciada" // operador elvis ?:

    println(nomePessoa) // null
    println(nomeFinal)

}