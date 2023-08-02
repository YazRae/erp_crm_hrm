import { Schema, model } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const clientSchema = new Schema(
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
    contactPerson: {
      type: String,
      trim: true,
      required: true,
    },
    role: { type: Schema.ObjectId, ref: "Role", autopopulate: true },
    bankAccount: {
      type: String,
      trim: true,
    },
    companyRegNumber: {
      type: Number,
      trim: true,
    },
    companyTaxID: {
      type: String,
      trim: true,
    },
    customField: [
      {
        fieldName: {
          type: String,
          trim: true,
        },
        fieldValue: {
          type: String,
          trim: true,
        },
      },
    ],
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
      lowercase: true,
    },
    website: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

clientSchema.plugin(mongooseAutoPopulate);

export default model("Client", clientSchema);
