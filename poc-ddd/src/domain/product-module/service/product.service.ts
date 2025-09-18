import DomainError from "../../@shared/errors/domain.error";
import ProductInterface from "../entity/product.interface";

export default class ProductService {
    static updatePricesInBatch(products: ProductInterface[], percentage: number) {
        if (percentage <= 0) throw new DomainError('Percentage value should be greater than zero');
        if (!products || products.length <= 0) throw new DomainError('Products should be required to update prices');
            products.forEach(product => {
            const currentPrice = product.price;
            const newPrice = currentPrice + (currentPrice * percentage) / 100;
            product.changePrice(newPrice);
        })
    }
}