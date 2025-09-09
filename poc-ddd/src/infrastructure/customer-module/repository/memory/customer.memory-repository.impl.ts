import Customer from "../../../../domain/customer-module/entity/customer";
import CustomerRepository from "../../../../domain/customer-module/repository/customer.repository";

export default class CustomerMemoryRepository implements CustomerRepository {

    private db!: Map<string, Customer>;

    constructor() {
        this.db = new Map();
    }

    async create(entity: Customer): Promise<void> {
        this.db.set(entity.id, entity);
    }

    async update(entity: Customer): Promise<void> {
        this.findById(entity.id);
        this.db.set(entity.id, entity);
    }

    async findById(id: string): Promise<Customer> {
        const customer = this.db.get(id);
        if (!customer) {
            throw new Error("Customer not found");
        }
        return customer;
    }

    async findAll(): Promise<Customer[]> {
        return Array.from(this.db.values());
    }

}