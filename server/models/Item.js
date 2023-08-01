import { Schema, model } from "mongoose";

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
      type: Array,
      required: true,
    },
    priceRecords: {
      type: Array,
      required: true,
    },
    suppliers: {
      type: [Schema.ObjectId],
      ref: "Suppliers",
      autopopulate: true,
      trim: true,
      required: true,
    },
    defaultUnitsOfMeasure: {
      type: String,
      required: true,
    },
    itemlocations: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model("Item", itemSchema);
