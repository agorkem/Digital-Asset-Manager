const FolderModel = require('../model/FolderModel');

class FolderRepo {
  static async create(folder) {
    const createdFolder = await FolderModel.create(folder);
    return createdFolder.toObject();
  }

  static async createMany(folders) {
    const createdFolders = await FolderModel.insertMany(folders);
    return createdFolders;
  }

  static async listDirectoryByPath(path) {
    const folderDirectory = await FolderModel.findOne({ path: path })
      .populate('assets')
      .populate('children');

    return folderDirectory.toObject();
  }

  static delete(id) {
    return FolderModel.findByIdAndRemove(id).exec();
  }

  static deleteAll() {
    return FolderModel.deleteMany();
  }
}

module.exports = FolderRepo;
