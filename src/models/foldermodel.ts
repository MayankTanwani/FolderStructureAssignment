import { Column, Table, BelongsTo, ForeignKey, Model } from "sequelize-typescript";
import { Sequelize } from "sequelize-typescript";

@Table({
    tableName: "folder_model",
    timestamps: true
})

export class FolderModel extends Model{
    @Column({
        primaryKey: true,
        autoIncrement: true,
        field: "folder_id"
    })
    folderId: number;

    @Column({
        allowNull: false,
        field: "folder_name",
        unique: true
    })
    folderName: string;

    @ForeignKey(() => FolderModel)
    @Column({
        allowNull: true,
        field: "parent_id",
    })
    parentId: number;

    @Column({
        field: "created_at",
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    })
    createdAt: Date;

    @Column({
        field: "updated_at",
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    })
    updatedAt: Date;

    @BelongsTo(() => FolderModel)
    parent: FolderModel
}