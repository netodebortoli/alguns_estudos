package com.aristidesdebortoli.under.framework;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class DataBaseImpl {
    private DataBaseImpl() {
    }

    private static Long sequencialId = 0L;

    private static final Map<String, Pessoa> db = new HashMap<>();

    @Transaction
    public static void salvar(Pessoa p) {
        Objects.requireNonNull(p.nome(), "Nome não pode ser nulo!");
        Objects.requireNonNull(p.cpf(), "CPF não pode ser nulo!");
        if (db.containsKey(p.cpf())) {
            throw new InvalidObjectException("CPF " + p.cpf() + " já cadastrado!");
        }
        Pessoa newPessoa = new Pessoa(++sequencialId, p.nome(), p.cpf());
        db.put(p.cpf(), newPessoa);
    }

    public static List<Pessoa> listar() {
        return db.values().stream().toList();
    }
}
