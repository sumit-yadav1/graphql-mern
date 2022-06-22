import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const result = await mongoose.connect(process.env.LIVE_DB_URL);
    console.log(
      `database has connected ${result.connection.host}/${result.connection.port}`
    );
  } catch (err) {
    console.log("check error in connecting database", err);
  }
};
