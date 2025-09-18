import request from 'supertest';
import { app, sequelize } from '../../../../src/infrastructure/api/express';

describe('end-to-end tests for product module', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it('should create a product', async () => {
        const response = await request(app)
            .post('/products')
            .send({
                name: 'Teclado Mecanico Redragon',
                price: 199.9
            });

        expect(response.body).toBeDefined()
        expect(response.status).toBe(201)
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe('Teclado Mecanico Redragon')
        expect(response.body.price).toBe(199.9)
    })

    it('should list products', async () => {
        await request(app)
            .post('/products')
            .send({
                name: 'Teclado Mecanico Kumara Redragon',
                price: 199.9
            });

        await request(app)
            .post('/products')
            .send({
                name: 'Mouse Gamer Cobra M700 Redragon',
                price: 139.9
            });

        const response = await request(app)
            .get('/products')

        expect(response.status).toBe(200)
        expect(response.body.products.length).toBe(2)
        expect(response.body.products[0].id).toBeDefined()
        expect(response.body.products[0].name).toBe('Teclado Mecanico Kumara Redragon')
        expect(response.body.products[0].price).toBe(199.9)
        expect(response.body.products[1].id).toBeDefined()
        expect(response.body.products[1].name).toBe('Mouse Gamer Cobra M700 Redragon')
        expect(response.body.products[1].price).toBe(139.9)
    })

    it('should update products prices in batch', async () => {
        const product1 = await request(app)
            .post('/products')
            .send({
                name: 'Teclado Mecanico Kumara Redragon',
                price: 200
            });

        const product2 = await request(app)
            .post('/products')
            .send({
                name: 'Mouse Gamer Cobra M700 Redragon',
                price: 150
            });

        await request(app)
            .post('/products/update/prices/batch')
            .send({
                productIds: [product1.body.id, product2.body.id],
                percentage: 10
            });

        const response = await request(app)
            .get('/products');

        expect(response.status).toBe(200);
        expect(response.body.products.length).toBe(2);
        expect(response.body.products[0].id).toBeDefined();
        expect(response.body.products[0].name).toBe('Teclado Mecanico Kumara Redragon');
        expect(response.body.products[0].price).toBe(220);
        expect(response.body.products[1].id).toBeDefined();
        expect(response.body.products[1].name).toBe('Mouse Gamer Cobra M700 Redragon');
        expect(response.body.products[1].price).toBe(165);
    })

})