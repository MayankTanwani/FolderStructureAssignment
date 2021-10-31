import App from "./app";
import { FolderModel } from "./models/foldermodel";
import { FileModel } from "./models/filemodel";
import { Op, Sequelize } from "sequelize";

let start = async () => {
  await App.connectToDb();
  queriesToRun();
};

let createRootFolder = async () => {
    // function to create root folder in curr directory
    let rootFolder = new FolderModel({
      folderName: "root",
    });
    return await rootFolder.save();
  };