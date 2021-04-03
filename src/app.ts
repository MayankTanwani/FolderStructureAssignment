import * as path from "path";
import { Sequelize } from "sequelize-typescript";
import { DBConfig } from "./config";

class App {
    db: Sequelize;

    constructor() {
        this.init();
    }

    private async init() {
        
    }
    
    public async connectToDb() {
        this.db = new Sequelize({
            database: DBConfig.DATABASE,
            host: DBConfig.HOST,
            username: DBConfig.USERNAME,
            password: DBConfig.PASSWORD,
            dialect: "postgres",
            modelPaths: DBConfig.MODEL_PATH,
            modelMatch: (filename, member) => {
                return filename === member.toLowerCase();
            },       
        });
        try {
            await this.db.sync({ force: DBConfig.SYNC_FLAG});
            console.log("Synced");
        } catch (e) {
            console.log("db sync error", e);
        }
    }
}

export default new App();