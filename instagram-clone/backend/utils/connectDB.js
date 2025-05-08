import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "instagram-clone",
    });
    console.log("Mongodb connected successfully! 🌿🌿🌿");
  } catch (error) {
    console.log("Mongodb Error: 🍂🍂🍂 " + error);
  }
};
export default connectDB;
