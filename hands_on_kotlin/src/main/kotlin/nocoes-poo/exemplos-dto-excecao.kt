package org.aristides_debortoli.`nocoes-poo`

fun main() {
    val user = Usuario("Aristides", "email@email.com")
    println(user)

    // Simulando um erro e capturando com o bloco try-catch-finally
    val maybeFailure = try {
        // code that can crash
        val language = "Kotlin"
        language.substring(10, 20) // crash
    } catch (e: Exception) {
        "some faulty error message"
    } finally {
        // execute some code no matter what
    }

    // A variavel maybeFailure contém o retorno do bloco catch
    println(maybeFailure)

}