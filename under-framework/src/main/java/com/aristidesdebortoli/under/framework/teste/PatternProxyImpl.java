package com.aristidesdebortoli.under.framework.teste;

import com.aristidesdebortoli.under.framework.Pessoa;

public class PatternProxyImpl implements BaseService {

    private final BaseService service;

    public PatternProxyImpl(BaseService service) {
        this.service = service;
    }

    @Override
    public void cadastrar(Pessoa pessoa) {
        System.out.println("Cadastrando pessoa via Pattern Proxy");
        service.cadastrar(pessoa);
        System.out.println("Fim da execução do Proxy.\n");
    }

    @Override
    public void listar() {
        System.out.println("Listando pessoas via Pattern Proxy");
        service.listar();
        System.out.println("Fim da execução do Proxy.\n");
    }
}
