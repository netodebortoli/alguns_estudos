import Product from "../domain/product";

export default interface ProductGateway {
    find(id: string): Promise<Product>;
    findAll(): Promise<Product[]>;
}