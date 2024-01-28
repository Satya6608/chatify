const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/users", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

module.exports = { connectToDatabase };