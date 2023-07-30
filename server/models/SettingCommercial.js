import { Schema, model } from "mongoose";

const settingCommercialSchema = new Schema(
  {
    removed: {
      type: Boolean,
      default: false,
    },
    name: {
      type: Array,
      default: true,
    },
    displayName: {
      type: String,
      trim: true,
      required: true,
    },
    value: {
      type: String,
      trim: true,
      required: true,
    },
    tableName: {
      type: String,
      trim: true,
    },
    relationID: {
      type: String,
      trim: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model("SettingCommercial", settingCommercialSchema);
