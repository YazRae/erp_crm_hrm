import { Schema, model } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const itemSchema = new Schema(
  {
    removed: {
      type: Boolean,
      default: false,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    itemCode: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    costRecords: {
      type: String,
      required: true,
    },
    priceRecords: {
      type: String,
      required: true,
    },
    suppliers: { type: Schema.ObjectId, ref: "Suppliers", autopopulate: true },
    defaultUnitsOfMeasure: {
      type: String,
      required: true,
    },
    itemLocations: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

itemSchema.plugin(mongooseAutoPopulate);

export default model("Item", itemSchema);
