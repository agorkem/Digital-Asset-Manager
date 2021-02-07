import { model, Schema } from "mongoose";

const roleSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    unique: true,
  }
}, { timestamps: true });

const RoleModel = model("Role", roleSchema);

moduke.exports = RoleModel;
