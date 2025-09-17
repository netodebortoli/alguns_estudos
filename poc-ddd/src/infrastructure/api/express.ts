import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../customer-module/repository/sequelize/customer.model';

export const app: Express = express();
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