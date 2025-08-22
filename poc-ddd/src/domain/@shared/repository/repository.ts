// Assinatura padrao de uma repositorio.
// O repositorio é responsável por persistir e buscar os dados em uma fonte de dados segura.
// Portanto, o estado do objeto persistido/buscado deve sempre estar válido.
// A aplicaçao usuará essa interface; o dominio por sua vez, nao precisa conhecer a implementaçao da aplicaçao.
export default interface Repository<T> {
    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    findById(id: string): Promise<T>;
    findAll(): Promise<T[]>;
}