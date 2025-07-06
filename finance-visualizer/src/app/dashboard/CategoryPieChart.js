"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Distinct colors for each category
const COLORS = {
  Food: "#4f46e5",
  Travel: "#10b981",
  Shopping: "#f59e0b",
  Health: "#ef4444",
  Other: "#6b7280",
};

export default function CategoryPieChart({ transactions }) {
  // 1️⃣ Aggregate totals by category
  const totals = {};
  transactions.forEach((tx) => {
    // guard: ensure it has a category
    const cat = tx.category || "Other";
    totals[cat] = (totals[cat] || 0) + tx.amount;
  });

  // 2️⃣ Convert to array for Recharts
  const data = Object.entries(totals).map(([category, amount]) => ({
    category,
    amount,
  }));

  // 3️⃣ No data fallback
  if (data.length === 0) {
    return (
      <p className="text-center mt-4 text-gray-500">
        No transactions to show in categories.
      </p>
    );
  }

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            outerRadius={100}
            innerRadius={60}
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                key={entry.category}
                fill={COLORS[entry.category] ?? "#888888"}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `₹${value}`}
            contentStyle={{ borderRadius: "8px" }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            formatter={(value) => <span className="text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
