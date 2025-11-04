export default interface ClientAdmFacade {
    addClient(client: InputAddClientDTO): Promise<void>;
    findClient(id: InputFindClientDTO): Promise<OutputFindClientDTO>;
}

export interface InputAddClientDTO {
    name: string;
    email: string;
    street: string;
    city: string;
    state: string;
}

export interface InputFindClientDTO {
    clientId: string;
}

export interface OutputFindClientDTO {
    id: string;
    name: string;
    email: string;
    street: string;
    city: string;
    state: string;
    createdAt: Date;
    updatedAt: Date;
}