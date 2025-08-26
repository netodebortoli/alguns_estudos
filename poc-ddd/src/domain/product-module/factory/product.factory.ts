import OtherProduct from "../entity/other.product";
import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";

export default class ProductFactory {

    public static create(name: string, price: number, type: string): ProductInterface {
        switch (type) {
            case '1':
                return new Product(name, price);
            case '2':
                return new OtherProduct(name, price);
            default:
                throw new Error('Invalid type when create product.');
        }
    }

}