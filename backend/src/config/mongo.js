import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

export const connectMongo = async () => {
  try {

    console.log("MONGO_URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB conectado");

  } catch (error) {
    console.error("Error MongoDB:", error);
    process.exit();
  }
};