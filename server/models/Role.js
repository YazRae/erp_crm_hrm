import { Schema, model } from "mongoose";

const roleSchema = new Schema(
  {
    removed: {
      type: Boolean,
      default: false,
    },
    department: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    displayName: {
      type: String,
      trim: true,
      required: true,
    },
    dashboardType: {
      type: String,
      trim: true,
    },
    authorizedPages: [{ type: String, lowercase: true, trim: true }],
    permissions: [{ type: Schema.ObjectId, ref: "Permission" }],
  },
  { timestamps: true }
);

export default model("Role", roleSchema);
