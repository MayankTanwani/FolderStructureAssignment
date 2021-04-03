I have completed this assignment as per the requirements mentioned in the E-Mail.

I have used PostgreSQL as the database with Sequelize ORM and typescript as the Programming Language. 
The models are present in the models folder. I have also created a config.ts for DB connection credentials. 

I have placed all the functions in the index.ts which is also the root file of the application. 
I have made necessary functions to mimic the file structure given in the example and functions for required queries are also present in the file.

I have created two models as follows: 

Folder Model:
    folderId: integer -> primaryKey, sequenced
    folderName: string -> name of the folder
    parentId: integer -> foreign key to folder model
    createdAt: Date -> store creation time of the file,
    updatedAt: Date -> store updation time of the file

File Model: 
    fileId: integer -> primaryKey, sequenced
    fileName: string -> name of the file
    parentId: number -> foreign key to folder model (self)
    format: string -> stores the format of the file
    size: integer -> stores the size of file in KB
    dimentions: string -> dimentions of the file
    createdAt: Date -> store creation time of the file,
    updatedAt: Date -> store updation time of the file

Build code: npm install
Run Code: npm start

Db Credentials are present in the src/config.ts file. These would have to valid for the code to run successfully. 
The queriesToRun function in index.js contains the list of queries and their example code.