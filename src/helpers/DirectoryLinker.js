const fs = require('fs');
const util = require('util');
const path = require('path');
const AssetRepo = require('../database/repository/AssetRepo');
const FolderRepo = require('../database/repository/FolderRepo');

function print(input) {
  const numberOfLines = (input.match(/\n/g) || []).length;
  process.stdout.clearScreenDown();
  process.stdout.write(input);
  process.stdout.cursorTo(0);
  process.stdout.moveCursor(0, -numberOfLines);
}

async function populateDirectoryStructure(basePath) {
  const directoryStructure = {};

  async function traverseDirectory(currentPath, parentPath = "") {
    try {
      print(`Reading: ${currentPath}`);

      const normalizedCurrentPath = path.normalize(currentPath);
      const normalizedParentPath = path.normalize(parentPath);

      const directory = await fs.promises.opendir(normalizedCurrentPath);

      const directoryObject = {
        name: path.basename(normalizedCurrentPath),
        path: normalizedCurrentPath,
        parent: normalizedParentPath,
        files: [],
      };

      directoryStructure[directoryObject.path] = directoryObject;

      for await (let dirent of directory) {
        if (dirent.isDirectory()) {
          await traverseDirectory(path.join(directoryObject.path, dirent.name), directoryObject.path);
        } else {
          directoryStructure[directoryObject.path].files.push({
            name: path.basename(dirent.name),
            path: path.join(directoryObject.path, dirent.name),
          });
        }
      }
    } catch(err) {
      console.log(currentPath, parentPath, err);
    }
  }

  try {
    await traverseDirectory(basePath);
  } catch(err) {
    console.log(err);
  } finally {
    return directoryStructure;
  }
}

async function DirectoryLinker(dir,repos) {
  console.log('Linking directory.')
  try {
    await await repos.AssetRepo.deleteAll({});
    await await repos.FolderRepo.deleteAll({});
  
    const directoryStructure = await populateDirectoryStructure(dir);
    const directoryKeys = Object.keys(directoryStructure);
    let directoryCount = directoryKeys.length;
    let assetNumber = directoryKeys.reduce((accumulator, key) => directoryStructure[key].files.length + accumulator, 0)

    for (let key of directoryKeys) {
      const folder = directoryStructure[key];

      try {
        const createdFolder = await repos.FolderRepo.create({
          name: folder.name,
          path: folder.path,
          parent: folder.parent
        });
        directoryCount = directoryCount-1;

        if(folder.files.length > 0) {
          try {
            const createdAssets = await repos.AssetRepo.createMany(
              folder.files.map(file => ({ 
                name: file.name, 
                path: file.path,
                folder: createdFolder._id,
              }))
            );
            assetNumber = assetNumber - folder.files.length;
          } catch(err) {
            console.log(file, err);
          }
        }

      } catch (err) {
        console.error(key, folder, err);
      } finally {
        print(`Assets left: ${assetNumber} | Directories left: ${directoryCount}`);
      }
    }
    print('Directory linking completed.');
  } catch(err) {
    console.error("Error: Couldn't link files to database:", err);
  }
}

module.exports = DirectoryLinker;
