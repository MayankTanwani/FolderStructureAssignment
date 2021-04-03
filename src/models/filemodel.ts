import { Column, Table, BelongsTo, ForeignKey, Model } from "sequelize-typescript";
import { Sequelize } from "sequelize-typescript";
import { FolderModel } from "./foldermodel";

@Table({
    tableName: "file_model",
    timestamps: true
}) 
export class FileModel extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        field: "file_id"
    })
    fileId: number;

    @Column({
        allowNull: false,
        field: "file_name"
    })
    fileName: string;

    @ForeignKey(() => FolderModel)
    @Column({
        allowNull: false,
        field: "parent_id"
    })
    parentId: number;

    @Column({
      allowNull: false,
      field: "format"  
    })
    format: string;
    
    @Column({
        allowNull: false,
        field: "size"  
    })
    size: number;

    @Column({
        allowNull: false,
        field: "dimentions"  
    })
    dimentions: string;

    @BelongsTo(() => FolderModel)
    parent: FolderModel

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
}