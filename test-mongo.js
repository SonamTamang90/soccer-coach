// Simple script to test MongoDB connection
require("dotenv").config({ path: ".env.local" });

const mongoose = require("mongoose");

async function main() {
  console.log("Connecting to MongoDB...");
  console.log(
    "MongoDB URI:",
    process.env.MONGODB_URI ? "URI is set" : "URI is not set"
  );

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully!");

    // List all collections in the database
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("Collections in the database:");
    collections.forEach((collection) => {
      console.log(` - ${collection.name}`);
    });

    // Count documents in the users collection
    const usersCount = await mongoose.connection.db
      .collection("users")
      .countDocuments();
    console.log(`Number of documents in users collection: ${usersCount}`);

    // Show a sample user document (without password)
    if (usersCount > 0) {
      const sampleUser = await mongoose.connection.db
        .collection("users")
        .findOne({}, { projection: { password: 0 } });
      console.log("Sample user document:");
      console.log(JSON.stringify(sampleUser, null, 2));
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main().catch(console.error);
