import { Schema, model } from "mongoose";
import mongooseAutopopulate from "mongoose-autopopulate";

const quoteSchema = new Schema(
  {
    removed: {
      type: Boolean,
      default: false,
    },
    converted: {
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
    date: {
      type: Date,
      required: true,
    },
    expiredDate: {
      type: Date,
      required: true,
    },
    client: {
      type: Schema.ObjectId,
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
    credit: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      default: "Draft",
    },
    pdfPath: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

quoteSchema.plugin(mongooseAutopopulate);

export default model("Quote", quoteSchema);
