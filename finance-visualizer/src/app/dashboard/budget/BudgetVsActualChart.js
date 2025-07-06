"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BudgetVsActualChart({ data }) {
  if (data === "no-budget") {
    return (
      <p className="text-red-500 text-center mt-6 font-medium">
        You haven't set a budget for this month yet.
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-6">
        No data to show for this month.
      </p>
    );
  }

  return (
    <div className="mt-8 border p-4 rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Budget vs Actual Spending
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#3b82f6" name="Budgeted" />
          <Bar dataKey="actual" fill="#ef4444" name="Actual" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
