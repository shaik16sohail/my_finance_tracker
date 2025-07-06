"use client";

import { useState } from "react";

const categories = ["Food", "Travel", "Shopping", "Health", "Other"];

export default function BudgetForm({ onAdd }) {
  const [rawMonth, setRawMonth] = useState(""); // For the input field
  const [formattedMonth, setFormattedMonth] = useState(""); // For sending to backend
  const [amounts, setAmounts] = useState({});
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formattedMonth) {
      setError("Please select a month.");
      return;
    }

    const entries = categories
      .map((category) => ({
        category,
        amount: +amounts[category] || 0,
        month: formattedMonth,
      }))
      .filter((entry) => entry.amount > 0);

    if (entries.length === 0) {
      setError("Please enter at least one non-zero budget.");
      return;
    }

    try {
      for (const entry of entries) {
        const res = await fetch("/api/budgets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });
        if (res.ok) {
          const data = await res.json();
          onAdd(data);
        }
      }

      setAmounts({});
      setRawMonth("");
      setFormattedMonth("");
      setError("");
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong.");
    }
  };

  const handleMonthChange = (e) => {
    const inputValue = e.target.value; // format: yyyy-mm
    setRawMonth(inputValue);

    const date = new Date(inputValue + "-01"); // Add day to make valid date
    const formatted = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    setFormattedMonth(formatted);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border p-4 rounded-lg shadow-sm bg-white"
    >
      <h2 className="text-lg font-semibold">Set Monthly Budgets</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Month Selector */}
      <div>
        <label className="block text-sm font-medium mb-1">Select Month</label>
        <input
          type="month"
          value={rawMonth}
          onChange={handleMonthChange}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      {/* Budget Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
        {categories.map((category) => (
          <div key={category}>
            <label className="block text-sm font-medium text-center">
              {category}
            </label>
            <input
              type="number"
              value={amounts[category] || ""}
              onChange={(e) =>
                setAmounts({ ...amounts, [category]: e.target.value })
              }
              placeholder="₹"
              className="w-full mt-1 border px-3 py-2 rounded-md text-center"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Save Budgets
      </button>
    </form>
  );
}
