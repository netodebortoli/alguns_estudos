import request from 'supertest';
import { app, sequelize } from '../../../../src/infrastructure/api/express';

describe('end-to-end tests for customer module', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it('should create a customer', async () => {
        // A lib 'supertest' dispoe de um objeto 'request'.
        // ELe é capaz de acionar a instancia do APP. Assim é possivel testar o App
        const response = await request(app)
            .post('/customers')
            .send({
                name: 'Aristides D. Neto',
                street: 'Rua Belarmino Pinto',
                number: '374',
                city: 'BG',
                zip: '29730000',
                state: 'ES'
            });

        expect(response.status).toBe(201)
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe('Aristides D. Neto')
        expect(response.body.address).toBeDefined()
    });

    it('should throw error when create customer with invalid data', async () => {
        const response = await request(app)
            .post('/customers')
            .send({
                name: '',
                street: 'Rua Belarmino Pinto',
                number: '374',
                city: 'BG',
                zip: '29730000',
                state: 'ES'
            });

        expect(response.status).toBe(400)
        expect(response.body.error).toBeDefined()
        expect(response.body.error).toBe('Invalid name')
    })

    it('should list customers', async () => {
        await request(app)
            .post('/customers')
            .send({
                name: 'Aristides D. Neto',
                street: 'Rua Belarmino Pinto',
                number: '374',
                city: 'BG',
                zip: '29730000',
                state: 'ES'
            });

        await request(app)
            .post('/customers')
            .send({
                name: 'Amanda F. Merellis',
                street: 'Rua Eurico Gaspar Dutra',
                number: 's/n',
                city: 'Colatina',
                zip: '29700000',
                state: 'ES'
            });

        const response = await request(app)
            .get('/customers');

        expect(response.status).toBe(200)
        expect(response.body.customers.length).toBe(2)
        expect(response.body.customers[0].id).toBeDefined()
        expect(response.body.customers[0].name).toBe('Aristides D. Neto')
        expect(response.body.customers[1].id).toBeDefined()
        expect(response.body.customers[1].name).toBe('Amanda F. Merellis')
    })

});