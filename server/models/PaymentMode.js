import { Schema, model } from "mongoose";

const paymentModeSchema = new Schema(
  {
    removed: {
      type: Boolean,
      default: false,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ref: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model("PaymentMode", paymentModeSchema);
