const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
    path: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
      trim: true,
    },
    parent: {
      type: mongoose.Schema.Types.String,
      ref: "Folder",
    },
  }, 
  {
    timestamps: true,
    w: "majority",
    j: true,
    timeout: 1000,
  }
);

folderSchema.virtual("assets", {
  ref: "Asset",
  localField: "_id",
  foreignField: "folder",
});

folderSchema.virtual("children", {
  ref: "Folder",
  localField: "path",
  foreignField: "parent",
});

folderSchema.set("toObject", { virtuals: true });
folderSchema.set("toJSON", { virtuals: true });

const FolderModel = mongoose.model("Folder", folderSchema);

module.exports = FolderModel;
