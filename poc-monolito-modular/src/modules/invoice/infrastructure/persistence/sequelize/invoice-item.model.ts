import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceItemProps } from "../../../domain/invoice.item";
import InvoiceModel from "./invoice.model";

@Table({
    tableName: 'invoice_items',
    timestamps: false,
})
export default class InvoiceItemModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id?: string;

    @Column({ allowNull: false })
    name?: string;

    @Column({ allowNull: false, type: 'decimal' })
    price?: number;

    @Column({ field: "created_at", allowNull: false })
    createdAt!: Date;

    @Column({ field: "updated_at", allowNull: false })
    updatedAt!: Date;

    @ForeignKey(() => InvoiceModel)
    @Column({ field: "invoice_id", allowNull: false })
    invoiceId?: string;

    @BelongsTo(() => InvoiceModel)
    invoice!: InvoiceModel;

    static toItemProps(itemModel: InvoiceItemModel): InvoiceItemProps {
        return ({
            id: itemModel.get().id,
            name: itemModel.get().name,
            price: itemModel.get().price,
            createdAt: itemModel.get().createdAt,
            updatedAt: itemModel.get().updatedAt,
        });
    }
}