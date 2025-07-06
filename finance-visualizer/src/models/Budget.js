import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["Food", "Travel", "Shopping", "Health", "Other"],
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: String, // e.g., "Jul 2025"
    required: true,
  },
});

const Budget =
  mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);

export default Budget;
