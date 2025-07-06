import mongoose from "mongoose";

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null };
}

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI is undefined");
    throw new Error("MONGODB_URI not set");
  }

  try {
    cached.conn = await mongoose.connect(uri, {
      dbName: "finance",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");
    return cached.conn;
  } catch (err) {
    console.error("❌ MongoDB connect error:", err);
    throw err;
  }
}
