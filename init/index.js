const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
    return initDB();
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
     ...obj,
     owner:"6887145541146ddfa02a528a",
    }));
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data");
  } catch (err) {
    console.error("Initialization error:", err);
  } finally {
    process.exit(); // End the script
  }
};
