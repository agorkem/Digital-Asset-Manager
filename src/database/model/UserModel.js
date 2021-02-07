import { model, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: Schema.Types.String,
    lowercase: true,
    unique: true,
    trim: true,
    index: true,
    validate: true,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    hidden: true,
    minLength: 6,
    trim: true,
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: "Role",
  }],
}, { timestamps: true });

const UserModel = model("User", userSchema);

module.exports = UserModel;
