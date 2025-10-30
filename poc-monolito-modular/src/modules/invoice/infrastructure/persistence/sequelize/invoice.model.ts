import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Invoice from "../../../domain/invoice";
import InvoiceItemModel from "./invoice-item.model";

@Table({
    tableName: 'invoices',
    timestamps: false,
})
export default class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id?: string;

    @Column({ allowNull: false })
    name?: string;

    @Column({ allowNull: false })
    document?: string;

    @Column({ allowNull: false })
    street?: string;

    @Column({ allowNull: false })
    city?: string;

    @Column({ allowNull: false })
    state?: string;

    @HasMany(() => InvoiceItemModel)
    items: InvoiceItemModel[];

    @Column({ field: "created_at", allowNull: false })
    createdAt!: Date;

    @Column({ field: "updated_at", allowNull: false })
    updatedAt!: Date;

    static toDomain(invoice: InvoiceModel): Invoice {
        return new Invoice({
            id: invoice.get().id,
            name: invoice.get().name,
            document: invoice.get().document,
            address: {
                street: invoice.get().street,
                city: invoice.get().city,
                state: invoice.get().state,
            },
            items: (invoice.get().items || []).map((item: InvoiceItemModel) => InvoiceItemModel.toItemProps(item)),
            createdAt: invoice.get().createdAt,
            updatedAt: invoice.get().updatedAt,
        });
    }
}