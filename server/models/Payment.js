import { Schema, model, ObjectId } from "mongoose";
import autoPopulate from "mongoose-autopopulate";
import AutoIncrementFactory from "mongoose-sequence";
import { connection } from "../config/dbConn.js";

const paymentSchema = new Schema(
  {
    removed: {
      type: Boolean,
      default: false,
    },
    number: {
      type: Number,
      required: true,
    },
    client: {
      type: ObjectId,
      ref: "Client",
      autopopulate: true,
      required: true,
    },
    invoice: {
      type: ObjectId,
      ref: "Invoice",
      required: true,
      autopopulate: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMode: {
      type: ObjectId,
      ref: "PaymentMode",
      autopopulate: true,
    },
    ref: {
      type: String,
    },
    description: {
      type: String,
    },
    pdfPath: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const AutoIncrement = AutoIncrementFactory(connection);

paymentSchema.plugin(AutoIncrement, {
  inc_field: "payment",
  reference_value: "payment",
  start_seq: 500,
});

paymentSchema.plugin(autoPopulate);

export default model("Payment", paymentSchema);
