import App from "./app";
import { FolderModel } from "./models/foldermodel";
import { FileModel } from "./models/filemodel";
import { Op, Sequelize } from "sequelize";

let start = async () => {
  await App.connectToDb();
  queriesToRun();
};

let getTestFiles = async () => {
    // Get all test files and order by creation date ascending
    return await FileModel.findAll({
      order: [["createdAt", "asc"]],
    });
  };

  let findAllTestFilesByName = async (fileName) => {
    // Find all test files with specific name
    return await FileModel.findAll({
      where: {
        fileName: {
          [Op.iLike]: `%${fileName}%`,
        },
      },
    });
  };