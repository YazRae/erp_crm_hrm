import dotenv from "dotenv";
import { connect, createConnection } from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    await connect(process.env.DATABASE_URL);
  } catch (err) {
    console.log(err);
  }
};

export const connection = createConnection(process.env.DATABASE_URL);

export default connectDB;
