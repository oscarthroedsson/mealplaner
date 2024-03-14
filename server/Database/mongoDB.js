import mongoose from "mongoose"; //connects to DB
import { MongoClient } from "mongodb";
//process.env.API_KEY

const uri = process.env.MONGO_URL;
const databaseName = process.env.MONGO_DB_NAME;
const collectionName = process.env.MONGO_COLLECTION;

console.log("🔗 URI: ", uri);
console.log("DB NAME: ", databaseName);
console.log("DB NAME: ", collectionName);

const client = new MongoClient(uri);
const database = client.db(databaseName);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log("🍃 | Successfully connected to MongoDB. 🎉");
  } catch (error) {
    console.error("🧹 | Could not connect to MongoDB: ", error);
  }
};
connectToDatabase();

export function mongoDBstring() {
  const wholeColl = client.db(databaseName).collection(collectionName);
  return wholeColl;
}
