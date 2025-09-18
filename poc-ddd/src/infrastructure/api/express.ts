import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../customer-module/repository/sequelize/customer.model';
import { customerRoute } from './routes/customer.routes';

export const app: Express = express();

app.use(express.json());

// Define as rotas da aplicação.
app.use('/customers', customerRoute)

export let sequelize: Sequelize

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
    });
    await sequelize.addModels([CustomerModel])
    await sequelize.sync()
}

setupDb();