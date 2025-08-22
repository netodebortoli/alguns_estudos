import Repository from "../../@shared/repository/repository";
import Product from "../entity/product";

// Repositorio especifico para a entidade Produto.
// Algumas funcionalidades que o produto for requerer para acessar o banco, deve ser definido nessa interface.
export default interface ProductRepository extends Repository<Product> {
    
}