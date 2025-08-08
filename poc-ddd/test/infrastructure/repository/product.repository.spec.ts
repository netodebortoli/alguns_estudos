import { Sequelize } from 'sequelize-typescript';

describe("Product repository integration test", () => {

    let sequelize: Sequelize;

    // Inicializa o sequelize a cada teste
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:', // Banco de dados em memória
            logging: false,
            sync: { force: true } // Sincroniza o modelo (os 'models') com o banco de dados.
        });
    });

    // Fecha a conexão do sequelize a cada teste
    afterEach(async () => {
        await sequelize.close();
    });

    it('test', () => {

    });

})