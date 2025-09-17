import express, { Request, Response } from 'express';
import CreateCustomer from '../../../usecase/customer/create-customer';
import CustomerRepositoryImpl from '../../customer-module/repository/sequelize/customer.repository.impl';

export const customerRoute = express.Router();
const repository = new CustomerRepositoryImpl()

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
        res.send(output).status(201)
    } catch (error) {
        console.log(error)
        res.send(error).status(500)
    }
});