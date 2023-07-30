import { Schema, model, ObjectId } from "mongoose";
import autoPopulate from "mongoose-autopopulate";

const expenseSchema = new Schema(
  {
    removed: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    ref: {
      type: String,
      trim: true,
    },
    supplier: {
      type: ObjectId,
    },
    OrderForm: {
      type: ObjectId,
    },
    expenseCategory: {
      type: ObjectId,
      ref: "ExpenseCategory",
      required: true,
      autoPopulate: true,
    },
    taxRate: {
      type: Number,
    },
    subTotal: {
      type: Number,
    },
    taxTotal: {
      type: Number,
    },
    total: {
      type: Number,
    },
    paymentMode: {
      type: ObjectId,
      ref: "PaymentMode",
      autoPopulate: true,
    },
    attachedFile: {
      type: String,
    },
  },
  { timestamps: true }
);

expenseSchema.plugin(autoPopulate);

export default model("Expense", expenseSchema);
