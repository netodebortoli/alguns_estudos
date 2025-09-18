import express, { Request, Response } from 'express';
import DomainError from '../../../domain/@shared/errors/domain.error';
import CreateProduct from '../../../usecase/product/create-product';
import ProductRepositoryImpl from '../../product-module/repository/sequelize/product.repository.impl';
import ListProducts from '../../../usecase/product/list-products';
import BatchProductPriceUpdate from '../../../usecase/product/update-product-price-batch';
import NotFoundError from '../../../domain/@shared/errors/not.found';

export const productRoute = express.Router()

// Dependencias
const productRepository = new ProductRepositoryImpl();

// Rotas
productRoute.post('/', async (req: Request, res: Response) => {
    const useCase = new CreateProduct(productRepository);
    try {
        const input = {
            name: req.body.name,
            price: req.body.price,
        }
        const response = await useCase.execute(input);
        res.status(201).send(response);
    } catch (error) {
        console.log(error);
        if (error instanceof DomainError) {
            res.status(400).send({ error: error.message });
        } else {
            res.status(500).send({ error: 'Internal server error' });
        }
    }
})

productRoute.post('/update/prices/batch', async (req: Request, res: Response) => {
    const useCase = new BatchProductPriceUpdate(productRepository);
    try {
        const input = {
            ids: req.body.productIds,
            percentage: req.body.percentage,
        }
        await useCase.execute(input);
        res.status(200).send();
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).send({ error: error.message });
        }
        if (error instanceof DomainError) {
            res.status(400).send({ error: error.message });
        }  
        res.status(500).send({ error: 'Internal server error' });
    }
})

productRoute.get('/', async (req: Request, res: Response) => {
    const useCase = new ListProducts(productRepository);
    try {
        const response = await useCase.execute();
        res.status(200).send(response);
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).send({ error: error.message });
        }
        if (error instanceof DomainError) {
            res.status(400).send({ error: error.message });
        }  
        res.status(500).send({ error: 'Internal server error' });
    }
});