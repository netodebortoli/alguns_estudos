import express, { Request, Response } from 'express';
import CreateCustomer from '../../../usecase/customer/create-customer';
import ListCustomers from '../../../usecase/customer/list-customers';
import CustomerRepositoryImpl from '../../customer-module/repository/sequelize/customer.repository.impl';
import DomainError from '../../../domain/@shared/errors/domain.error';

// Exporta o router para ser usado na aplicação principal
export const customerRoute = express.Router();

// Dependências
const repository = new CustomerRepositoryImpl()

// Define as rotas da api de customers
customerRoute.post('/', async (req: Request, res: Response) => {
    const useCase = new CreateCustomer(repository)
    try {
        const input = {
            name: req.body.name,
            street: req.body.street,
            number: req.body.number,
            city: req.body.city,
            zip: req.body.zip,
            state: req.body.state,
        }
        const output = await useCase.execute(input)
        res.status(201).send(output)
    } catch (error) {
        if (error instanceof DomainError) {
            res.status(400).send({ error: error.message });
        } else {
            res.status(500).send({ error: 'Internal server error' });
        }
    }
});

customerRoute.get('/', async (req: Request, res: Response) => {
    try {
        const useCase = new ListCustomers(repository);
        const output = await useCase.execute();
        res.status(200).send(output)
    } catch (error) {
        if (error instanceof DomainError) {
            res.status(400).send({ error: error.message });
        } else {
            res.status(500).send({ error: 'Internal server error' });
        }
    }
});