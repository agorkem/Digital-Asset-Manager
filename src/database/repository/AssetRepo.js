const AssetModel = require('../model/AssetModel');

class AssetRepo {
  static async create(asset) {
    const createdAsset = await AssetModel.create(asset);
    return createdAsset.toObject();
  }

  static async createMany(assets) {
    const createdAssets = await AssetModel.insertMany(assets);
    return createdAssets;
  }

  static delete(id) {
    return AssetModel.findByIdAndRemove(id).exec();
  }

  static deleteAll() {
    return AssetModel.deleteMany();
  }
}

module.exports = AssetRepo;
