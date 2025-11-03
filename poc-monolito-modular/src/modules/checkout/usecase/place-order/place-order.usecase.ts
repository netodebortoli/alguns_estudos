import UseCase from "../../../@shared/domain/usecase/use-case";
import ClientAdmFacade, { OutputFindClientDTO } from "../../../client-adm/facade/client-adm.facade";
import InvoiceFacade, { OutputGenerateInvoiceDTO } from "../../../invoice/facade/invoice.facade";
import PaymentFacade, { OutputProcessTransactionDTO } from "../../../payment/facade/payment.facade";
import ProductFacade from "../../../product/facade/product.facade";
import StoreCatalogFacade, { OutputFindProductDTO } from "../../../store-catalog/facade/store-catalog.facade";
import Client from "../../domain/client";
import Order from "../../domain/order";
import Product from "../../domain/product";
import CheckoutGateway from "../../gateway/checkout.gateway";

type PlaceOrderUseCaseProps = {
    clientFacade: ClientAdmFacade;
    productFacade: ProductFacade;
    storeCatalogFacade: StoreCatalogFacade;
    paymentFacade: PaymentFacade;
    invoiceFacade: InvoiceFacade;
    checkoutRepository: CheckoutGateway;
}

export default class PlaceOrderUseCase implements UseCase {
    private _clientFacade: ClientAdmFacade;
    private _productFacade: ProductFacade;
    private _storeCatalogFacade: StoreCatalogFacade;
    private _paymentFacade: PaymentFacade;
    private _invoiceFacade: InvoiceFacade;
    private _checkoutRepository: CheckoutGateway;

    constructor(props: PlaceOrderUseCaseProps) {
        this._clientFacade = props.clientFacade;
        this._productFacade = props.productFacade;
        this._storeCatalogFacade = props.storeCatalogFacade;
        this._paymentFacade = props.paymentFacade;
        this._invoiceFacade = props.invoiceFacade;
        this._checkoutRepository = props.checkoutRepository;
    }

    async execute(input: Input): Promise<Output> {
        const clientDTO = await this._clientFacade.findClient({ clientId: input.clientId });
        await this.validateProducts(input.products);
        const products = await this.getProducts(input.products);
        const client = this.createClient(clientDTO);
        const order = new Order({ client: client, products: products })
        const transaction = await this.processTransaction(order);
        const invoice = await this.handlerOrderInvoice(transaction, client, products, order);
        await this._checkoutRepository.add(order);
        return {
            id: order.id.value,
            invoiceId: invoice ? invoice.id : '',
            status: order.status,
            total: order.totalSalesPrice,
            products: order.products.map(p => ({ id: p.id.value }))
        };
    }

    private async handlerOrderInvoice(
        transaction: OutputProcessTransactionDTO,
        client: Client,
        products: Product[],
        order: Order
    ) {
        let invoice = null;

        if (transaction.status === 'approved') {
            invoice = await this.generateInvoice(client, products);
            order.approve();
        } else {
            order.decline();
        }
        return invoice;
    }

    private async generateInvoice(
        client: Client,
        products: Product[]
    ) {
        const input = {
            name: client.name,
            document: 'document',
            street: client.address,
            city: 'city',
            state: 'state',
            items: products.map(p => ({
                name: p.name,
                price: p.salesPrice
            }))
        };

        console.log(input)

        return await this._invoiceFacade.generate(input);
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

    private async getProducts(productsIds: { id: string; }[]): Promise<Product[]> {
        let products = [];
        for (const p of productsIds) {
            const input = { productId: p.id };
            const product = await this._storeCatalogFacade.find(input);
            products.push(product);
        }
        return products.map(p => this.createProduct(p));
    }

    private createProduct(p: OutputFindProductDTO) {
        const props = this.mapProductFromDTO(p);
        return new Product(props);
    }

    private mapProductFromDTO(productDTO: OutputFindProductDTO) {
        return {
            id: productDTO.id,
            name: productDTO.name,
            description: productDTO.description,
            salesPrice: productDTO.salesPrice
        };
    }

    private createClient(from: OutputFindClientDTO): Client {
        return new Client({
            id: from.id,
            name: from.name,
            email: from.email,
            address: from.address,
        })
    }

    private async processTransaction(order: Order) {
        const input = { orderId: order.id.value, amount: order.totalSalesPrice }
        return await this._paymentFacade.processTransaction(input);
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
