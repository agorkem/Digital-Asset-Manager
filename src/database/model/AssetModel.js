const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
      trim: true,
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
    },
    path: {
      type: mongoose.Schema.Types.String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    }
  },
  {
    timestamps: true, 
    w: 'majority',
    j: true,
    timeout: 1000,
  }
);

const AssetModel = mongoose.model("Asset", assetSchema);

module.exports = AssetModel;
