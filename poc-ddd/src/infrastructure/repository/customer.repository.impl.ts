import Customer from "../../domain/entities/customer";
import CustomerRepository from "../../domain/repositories/customer.repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import { Sequelize } from "sequelize-typescript";

export default class CustomerRepositoryImpl implements CustomerRepository {

    constructor(private sequelize?: Sequelize) {}

    async create(entity: Customer): Promise<void> {
        // Modelo de dados !== do modelo do dominio
        // Nessa abordagem, optei por armanezar o address (VO) diretamente na tabela de customer
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address?.street,
            number: entity.address?.number,
            city: entity.address?.city,
            state: entity.address?.state,
            zip: entity.address?.zip,
            status: entity.isActive,
            rewardPoints: entity.rewardPoints
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.address?.street,
            number: entity.address?.number,
            city: entity.address?.city,
            state: entity.address?.state,
            zip: entity.address?.zip,
            status: entity.isActive,
            rewardPoints: entity.rewardPoints
        }, {
            where: { id: entity.id }
        });
    }

    async findById(id: string): Promise<Customer> {
        const customerModel = await CustomerModel.findOne({ where: { id } });
        if (!customerModel) {
            throw new Error("Customer not found");
        }
        return CustomerModel.toDomain(customerModel);
    }

    async findAll(): Promise<Customer[]> {
        const result = await CustomerModel.findAll();
        return result.map(CustomerModel.toDomain);
    }

}