import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ["Food", "Travel", "Shopping", "Health", "Other"], // ✔ predefined options
    required: true,
  },
});

const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

export default Transaction;
