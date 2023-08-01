import { Schema, model } from "mongoose";

const suppliersSchema = new Schema(
  {
    removed: {
      type: Boolean,
      default: false,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    company: {
      type: String,
      trim: true,
      required: true,
    },
    manager: {
      type: String,
      trim: true,
      required: true,
    },
    items: {
      type: [Schema.ObjectId],
      ref: "Item",
      autopopulate: true,
      trim: true,
      default: [],
    },
    bankAccount: {
      type: String,
      trim: true,
    },
    rateContract: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    cell: {
      type: Number,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model("Suppliers", suppliersSchema);
