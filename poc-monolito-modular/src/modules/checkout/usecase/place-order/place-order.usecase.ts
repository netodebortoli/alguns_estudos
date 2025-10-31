import UseCase from "../../../@shared/domain/usecase/use-case";
import ClientAdmFacade from "../../../client-adm/facade/client-adm.facade";
import ProductFacade from "../../../product/facade/product.facade";

type PlaceOrderUseCaseProps = {
    clientFacade: ClientAdmFacade;
    productFacade: ProductFacade;
}

export default class PlaceOrderUseCase implements UseCase {
    private _clientFacade: ClientAdmFacade;
    private _productFacade: ProductFacade;

    constructor(props: PlaceOrderUseCaseProps) {
        this._clientFacade = props.clientFacade;
        this._productFacade = props.productFacade;
    }

    async execute(input: Input): Promise<Output> {
        const client = await this._clientFacade.findClient({ clientId: input.clientId });

        await this.validateProducts(input.products);

        return {
            id: '<order_id>',
            invoiceId: '<invoice_id>',
            status: '<status>',
            total: 0,
            products: []
        }
    }

    private async validateProducts(products: { id: string }[]) {
        if (products.length === 0) {
            throw new Error("At least one product must be selected");
        }
        for (const p of products) {
            const input = { productId: p.id };
            const productStock = await this._productFacade.checkStock(input);
            if (productStock.stock <= 0) {
                throw new Error(`Product with id ${p.id} is out of stock`);
            }
        }
    }
}

type Input = {
    clientId: string;
    products: {
        id: string
    }[];
}

type Output = {
    id: string;
    invoiceId: string;
    status: string;
    total: number;
    products: {
        id: string;
    }[]
}
