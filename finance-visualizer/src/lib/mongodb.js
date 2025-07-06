import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null };
}

export async function connectToDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI not set in environment variables");
  }

  if (cached.conn) return cached.conn;

  cached.conn = await mongoose.connect(MONGODB_URI, {
    dbName: "finance",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return cached.conn;
}
