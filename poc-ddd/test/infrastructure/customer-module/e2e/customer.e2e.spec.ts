import request from 'supertest';
import { app, sequelize } from '../../../../src/infrastructure/api/express';

describe('end-to-end tests for customer module', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it('should create a customer', async () => {
        // A lib 'supertest' dispoe de um objeto 'request'.
        // ELe é capaz de acionar a instancia do APP. Assim é possivel testar o App
        const response = await request(app)
            .post('/customers/create')
            .send({
                name: 'Aristides D. Neto',
                street: 'Rua Belarmino Pinto',
                number: '374',
                city: 'BG',
                zip: '29730000',
                state: 'ES'
            });

        expect(response.status).toBe(200)
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe('Aristides D. Neto')
        expect(response.body.address).toBeDefined()
    });

});