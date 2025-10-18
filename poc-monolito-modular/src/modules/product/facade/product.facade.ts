export default interface ProductFacade {
    addProduct(input: InputAddProductDTO): Promise<any>;
    checkStock(input: InputCheckStockDTO): Promise<OutputCheckStockDTO>;
}

export interface InputAddProductDTO {
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface InputCheckStockDTO {
    productId: string;
}

export interface OutputCheckStockDTO {
    productId: string;
    stock: number;
}