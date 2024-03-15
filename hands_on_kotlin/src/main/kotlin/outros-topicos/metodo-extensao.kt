package org.aristides_debortoli.`outros-topicos`

fun Int.repeat(aString: String): String {
    var result = ""
    for (i in 1..this)
        result += aString
    return result
}

operator fun Int.times(aString: String): String {
    var result = ""
    for (i in 1..this)
        result += aString
    return result
}

fun main() {
    print(3.repeat("Ola, mundo!\n"))
    print(3 * "Hello\n")
}