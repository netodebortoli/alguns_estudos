import Repository from "../../@shared/repository/repository";
import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";

// Repositorio especifico para a entidade Produto.
// Algumas funcionalidades que o produto for requerer para acessar o banco, deve ser definido nessa interface.
// O repositorio é responsavel por persistir os dados e construir os objetos do dominio (Produto).
// O repositorio parte do pressuposto que o estado do objeto persistido/buscado esta valido.
// É responsabilidade do modelo de domínio (produto) que o estado do objeto persistido/buscado esteja valido.
export default interface ProductRepository extends Repository<Product> {
}