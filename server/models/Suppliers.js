import { Schema, model } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

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
    item: {
      type: Schema.ObjectId,
      ref: "Item",
      autopopulate: true,
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

suppliersSchema.plugin(mongooseAutoPopulate);

export default model("Suppliers", suppliersSchema);
