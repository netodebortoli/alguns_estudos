package abstractfactory;

import abstractfactory.produtos.Cadeira;
import abstractfactory.produtos.Mesa;

// As Factorys concretas implementam a interface AbstractFactoryMoveis
// As Fábricas Abstratas produzem produtos abstratos, assim o cliente não precisa se preocupar com detalhes de implementação
public interface AbstractFactoryMoveis {
    Cadeira criarCadeira();

    Mesa criarMesa(String cor);
}
