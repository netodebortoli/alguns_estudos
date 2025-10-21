import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import Client from "../../../domain/client";

@Table({
    tableName: "clients",
    timestamps: false,
})
export default class ClientModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    id!: string;

    @Column({ allowNull: false })
    name!: string;

    @Column({ allowNull: false })
    email!: string;

    @Column({ allowNull: false })
    address!: string;

    @Column({ field: "created_at", allowNull: false })
    createdAt!: Date;

    @Column({ field: "updated_at", allowNull: false })
    updatedAt!: Date;

    static toDomain(clientModel: ClientModel): Client {
        return new Client({
            id: clientModel.get().id,
            name: clientModel.get().name,
            email: clientModel.get().email,
            address: clientModel.get().address,
            createdDt: clientModel.get().createdAt,
            updatedDt: clientModel.get().updatedAt
        });
    }
}