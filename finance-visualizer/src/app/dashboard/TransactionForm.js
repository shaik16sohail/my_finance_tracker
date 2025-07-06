"use client";

import { useState } from "react";

// Predefined categories
const categories = ["Food", "Travel", "Shopping", "Health", "Other"];

export default function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚨 Basic Validation
    if (!description.trim() || !amount || !date || !category) {
      setError("All fields are required.");
      return;
    }

    if (amount <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description.trim(),
          amount: +amount,
          date,
          category,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onAdd(data); // update list
        setDescription("");
        setAmount("");
        setDate("");
        setCategory("");
        setError(""); // clear error
      } else {
        setError("Failed to add transaction.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 border rounded-lg space-y-3"
    >
      <h2 className="text-xl font-semibold">Add Transaction</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block text-sm font-medium">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded-md mt-1"
          placeholder="e.g. Groceries"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-3 py-2 rounded-md mt-1"
          placeholder="e.g. 500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border px-3 py-2 rounded-md mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded-md mt-1"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Add Transaction
      </button>
    </form>
  );
}
