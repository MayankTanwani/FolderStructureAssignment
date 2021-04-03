import * as path from "path";

export const DBConfig = {
    HOST: "localhost",
    DATABASE: "folderdb",
    USERNAME: "postgres",
    PASSWORD: "root",
    MODEL_PATH: [
        path.resolve(__dirname, "./models")
    ],
    DIALECT_SSL: false,
    SYNC_FLAG: false,
}