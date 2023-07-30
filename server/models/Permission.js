import { Schema, model } from "mongoose";

const permissionSchema = new Schema(
  {
    removed: {
      type: Boolean,
      default: false,
    },
    displayName: {
      type: String,
      trim: true,
      required: true,
    },
    apiGroup: {
      type: String,
      trim: true,
      required: true,
    },
    apiMethod: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Permission", permissionSchema);
