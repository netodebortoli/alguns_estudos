import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../customer-module/repository/sequelize/customer.model';
import ProductModel from '../product-module/repository/sequelize/product.model';
import { customerRoute } from './routes/customer.routes';
import { productRoute } from './routes/product.route';

export const app: Express = express();

app.use(express.json());

// Define as rotas da aplicação.
app.use('/customers', customerRoute)
app.use('/products', productRoute) 

export let sequelize: Sequelize

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
    });
    await sequelize.addModels([CustomerModel, ProductModel]);
    await sequelize.sync()
}

setupDb();