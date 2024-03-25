package com.aristidesdebortoli.under.framework.model;

import com.aristidesdebortoli.under.framework.Transaction;

public interface Veiculo {

    @Transaction
    void criarVeiculo(String nome, String fabricante);
}
