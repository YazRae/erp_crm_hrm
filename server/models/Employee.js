import { Schema, model } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const employeeSchema = new Schema(
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
    surname: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    role: { type: Schema.ObjectId, ref: "Role", autopopulate: true },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    urgentContact: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: "Single",
    },
  },
  { timestamps: true }
);

employeeSchema.plugin(mongooseAutoPopulate);

employeeSchema.index({
  name: "text",
  surname: "text",
  birthday: "text",
  status: "text",
});

export default model("Employee", employeeSchema);
