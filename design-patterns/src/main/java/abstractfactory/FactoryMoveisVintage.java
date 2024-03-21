package abstractfactory;

import abstractfactory.produtos.Cadeira;
import abstractfactory.produtos.CadeiraVintage;
import abstractfactory.produtos.Mesa;
import abstractfactory.produtos.MesaVintage;

public class FactoryMoveisVintage implements AbstractFactoryMoveis {
    @Override
    public Cadeira criarCadeira() {
        return new CadeiraVintage();
    }

    @Override
    public Mesa criarMesa(String cor) {
        return new MesaVintage(cor);
    }
}
