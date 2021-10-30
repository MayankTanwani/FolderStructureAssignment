import App from "./app";
import { FolderModel } from "./models/foldermodel";
import { FileModel } from "./models/filemodel";
import { Op, Sequelize } from "sequelize";

let start = async () => {
  await App.connectToDb();
  queriesToRun();
};

let addRootFolder = async () => {
  // Code for adding root folder
  let rootFolder = new FolderModel({
    folderName: "root",
  });
  return await rootFolder.save();
};
let addFolder = async (parentId, name) => {
  // Adding a folder by its parent and name
  let newFolder = new FolderModel({
    parentId: parentId,
    folderName: name,
  });
  return await newFolder.save();
};

let addFile = async (fileData) => {
  // Adding a file by its data
  let newFile = new FileModel({ ...fileData });
  return await newFile.save();
};

let getAllFiles = async () => {
  // Get all files and order by creation date
  return await FileModel.findAll({
    order: [["createdAt", "desc"]],
  });
};

let allFilesSize = async (folderId) => {
  // Initialize totalSize for the folder
  let totalSize = 0;

  // Get all subFolders for the current folder by their parentId
  let subFolders = await FolderModel.findAll({
    where: {
      parentId: folderId,
    },
  });

  // Get sizes of all the subFolders by recursion
  let subFolderSizes = await Promise.all(
    subFolders.map((subFolder) =>
      allFilesSize(subFolder.getDataValue("folderId"))
    )
  );

  // Adding subFolders sizes
  subFolderSizes.forEach((size) => (totalSize += size));

  // Get sum of all files via SQL sum function
  let fileSizes = await FileModel.findAll({
    attributes: [[Sequelize.fn("sum", Sequelize.col("size")), "total_size"]],
    where: {
      parentId: folderId,
    },
  });

  // Add sum of file size to total size
  totalSize += +(fileSizes && fileSizes.length > 0
    ? fileSizes[0].getDataValue("total_size")
    : 0);
  return totalSize;
};

let deleteFolder = async (folderId) => {
  // Get all subFolders for the current folder by their parentId
  let subFolders = await FolderModel.findAll({
    where: {
      parentId: folderId,
    },
  });

  // Delete all subFolders by recursion
  await Promise.all(
    subFolders.map((subFolder) =>
      deleteFolder(subFolder.getDataValue("folderId"))
    )
  );

  // Delete all files in the current folder
  await FileModel.destroy({
    where: {
      parentId: folderId,
    },
  });

  // Delete the current folder
  return await FolderModel.destroy({
    where: {
      folderId: folderId,
    },
  });
};

let findFilesByFileName = async (fileName) => {
  // Find all the files with ilike fileName
  return await FileModel.findAll({
    where: {
      fileName: {
        [Op.iLike]: `%${fileName}%`,
      },
    },
  });
};

let findFiles = async (fileName, format) => {
  // Find all the files with iLike fileName and format
  return await FileModel.findAll({
    where: {
      fileName: {
        [Op.iLike]: `%${fileName}%`,
      },
      format: format,
    },
  });
};

let renameFolder = async (orgFolderName, newFolderName) => {
  // Rename all folders with folderName as orgFolderName
  return await FolderModel.update(
    {
      folderName: newFolderName,
      updatedAt: new Date(),
    },
    {
      where: {
        folderName: orgFolderName,
      },
    }
  );
};
//Uncomment this function to test the application
let queriesToRun = async () => {
  await addRootFolder();
  await addFolder(1, "Folder1");
  await addFolder(1, "Folder2");
  await addFolder(3, "SubFolder1");
  await addFolder(3, "SubFolder2");
  await addFile({
    fileName: "File1.png",
    parentId: 2,
    format: "PNG",
    size: "10",
    dimentions: "",
  });
  await addFile({
    fileName: "File2.png",
    parentId: 2,
    format: "PNG",
    size: "10",
    dimentions: "",
  });
  await addFile({
    fileName: "File3.jpg",
    parentId: 5,
    format: "JPG",
    size: "10",
    dimentions: "",
  });
  await addFile({
    fileName: "File4.txt",
    parentId: 5,
    format: "TXT",
    size: "10",
    dimentions: "",
  });
  console.log(await getAllFiles());
  console.log(await allFilesSize(1));
  console.log(await deleteFolder(1));
  console.log(await findFilesByFileName("file"));
  console.log(await findFiles("file", "PNG"));
  console.log(await renameFolder("SubFolder2", "NestedFolder2"));
};

start();
