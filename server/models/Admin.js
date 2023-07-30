import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import mongooseAutoPopulate from "mongoose-autopopulate";

const adminSchema = new Schema(
  {
    removed: {
      type: Boolean,
      default: false,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    cell: {
      type: String,
      trim: true,
    },
    name: { type: String, required: true, lowercase: true },
    surname: { type: String, required: true, lowercase: true },
    photo: {
      type: String,
      trim: true,
    },
    role: { type: Schema.ObjectId, ref: "Role", autopopulate: true },
    hasCustomPermissions: {
      type: Boolean,
      default: false,
    },
    permissions: [{ type: Schema.ObjectId, ref: "Permission" }],
    isLoggedIn: { type: Boolean },
  },
  { timestamps: true }
);

adminSchema.plugin(mongooseAutoPopulate);

// generating a hash
adminSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
};

// checking if password is valid
adminSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default model("Admin", adminSchema);
