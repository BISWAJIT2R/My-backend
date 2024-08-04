import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
const URI1 = process.env.MONGODB_URI1;
const URI2 = process.env.MONGODB_URI2;

const IsdbConnected = async () => {
  try {
    const db = await mongoose.connect(`${URI1}${DB_NAME}${URI2}`);
    console.log("Database Connected sucessfully!!  🤖");
  } catch (error) {
    console.log(error);
  }
};
export default IsdbConnected;
