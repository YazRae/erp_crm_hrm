import { Schema, model, ObjectId } from "mongoose";
import autoPopulate from "mongoose-autopopulate";

const invoiceSchema = new Schema(
  {
    removed: {
      type: Boolean,
      default: false,
    },
    number: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    recurring: {
      type: String,
      default: "0",
    },
    date: {
      type: Date,
      required: true,
    },
    expiredDate: {
      type: Date,
      required: true,
    },
    client: {
      type: ObjectId,
      ref: "Client",
      required: true,
      autopopulate: true,
    },
    items: [
      {
        itemName: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
    taxRate: {
      type: Number,
      default: 0,
    },
    subTotal: {
      type: Number,
      default: 0,
    },
    taxTotal: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    credit: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    payment: [
      {
        type: ObjectId,
        ref: "Payment",
      },
    ],
    paymentStatus: {
      type: String,
      default: "unpaid",
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      default: "draft",
    },
    pdfPath: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

invoiceSchema.plugin(autoPopulate);

export default model("Invoice", invoiceSchema);
