import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer-module/entity/customer";
import CustomerRepository from "../../../../domain/customer-module/repository/customer.repository";
import CustomerModel from "./customer.model";
import NotFoundError from "../../../../domain/@shared/errors/not.found";

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
            throw new NotFoundError("Customer not found");
        }
        return CustomerModel.toDomain(customerModel);
    }

    async findAll(): Promise<Customer[]> {
        const result = await CustomerModel.findAll();
        return result.map(CustomerModel.toDomain);
    }

}