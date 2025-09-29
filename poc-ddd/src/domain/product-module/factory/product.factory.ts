import Product from "../entity/product";

export default class ProductFactory {

    public static create(name: string, price: number, type: string): Product {
        switch (type) {
            case '1':
                return new Product(name, price);
            default:
                throw new Error('Invalid type when create product.');
        }
    }

}