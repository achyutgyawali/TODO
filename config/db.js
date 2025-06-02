const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database Connected`);
  } catch (error) {
    console.log(`MongoDB not Connected`);
  }
};

module.exports = connectDB;
