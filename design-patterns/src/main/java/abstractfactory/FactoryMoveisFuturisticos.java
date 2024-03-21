package abstractfactory;

import abstractfactory.produtos.Cadeira;
import abstractfactory.produtos.CadeiraFuturistica;
import abstractfactory.produtos.Mesa;
import abstractfactory.produtos.MesaFuturistica;

public class FactoryMoveisFuturisticos implements AbstractFactoryMoveis {
    @Override
    public Cadeira criarCadeira() {
        return new CadeiraFuturistica();
    }

    @Override
    public Mesa criarMesa(String cor) {
        return new MesaFuturistica(cor);
    }
}
