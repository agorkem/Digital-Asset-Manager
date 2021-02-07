const mongoose = require('mongoose');

const AssetRepo = require('./repository/AssetRepo');
const FolderRepo = require('./repository/FolderRepo');
 
const connectDB = () => {
  return mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
};
 
const Repositories = { AssetRepo, FolderRepo };

module.exports.Repos = Repositories;
module.exports.connectDB = connectDB;
