export default interface StoreCatalogFacade {
    find(id: InputFindProductDTO): Promise<OutputFindProductDTO>;
    findAll(): Promise<OutputFindAllProductsDTO>;
}

export interface InputFindProductDTO {
    productId: string;
}

export interface OutputFindProductDTO {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

export interface OutputFindAllProductsDTO {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[];
}