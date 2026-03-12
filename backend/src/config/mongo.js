import mongoose from "mongoose";

export const connectMongo = async () => {
  try {

    await mongoose.connect("mongodb+srv://emilianolafuente1094_db_user:w5hAzSj00yqCUQeO@clusterbackedcoder.fr2bkqr.mongodb.net/?appName=ClusterBackedCoder");

    console.log("MongoDB conectado");

  } catch (error) {
    console.error("Error MongoDB:", error);
    process.exit();
  }
};

