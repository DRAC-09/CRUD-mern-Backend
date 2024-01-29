import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_DB);
    console.log(">>> BD is connected...");
  } catch (error) {
    console.log(error);
  }
};
