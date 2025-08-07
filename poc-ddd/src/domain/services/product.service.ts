import Product from "../entities/product";

export default class ProductService {
    static updatePricesInBatch(products: Product[], percentage: number) {
        if (percentage <= 0) throw new Error('Percentage value should be greater than zero')
        products.forEach(product => {
            const currentPrice = product.price;
            const newPrice = currentPrice + (currentPrice * percentage) / 100;
            product.changePrice(newPrice);
        })
    }
}