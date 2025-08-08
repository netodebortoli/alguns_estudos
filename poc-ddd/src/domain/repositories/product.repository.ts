import Product from "../entities/product";
import Repository from "./repository";

// Repositorio especifico para a entidade Produto.
// Algumas funcionalidades que o produto for requerer para acessar o banco, deve ser definido nessa interface.
export default interface ProductRepository extends Repository<Product> {
    
}