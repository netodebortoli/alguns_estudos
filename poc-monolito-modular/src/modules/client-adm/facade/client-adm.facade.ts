export default interface ClientAdmFacade {
    addClient(client: InputAddClientDTO): Promise<void>;
    findClient(id: InputFindClientDTO): Promise<OutputFindClientDTO>;
}

export interface InputAddClientDTO {
    name: string;
    email: string;
    address: string;
}

export interface InputFindClientDTO {
    clientId: string;
}

export interface OutputFindClientDTO {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}