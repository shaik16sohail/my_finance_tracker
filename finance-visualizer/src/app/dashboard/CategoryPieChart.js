"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Enhanced colors with gradients
const COLORS = {
  Food: "#4f46e5",
  Travel: "#10b981", 
  Shopping: "#f59e0b",
  Health: "#ef4444",
  Other: "#6b7280",
};

const CATEGORY_ICONS = {
  Food: "🍽️",
  Travel: "✈️",
  Shopping: "🛍️",
  Health: "🏥",
  Other: "📝"
};

export default function CategoryPieChart({ transactions }) {
  // Aggregate totals by category
  const totals = {};
  transactions.forEach((tx) => {
    const cat = tx.category || "Other";
    totals[cat] = (totals[cat] || 0) + tx.amount;
  });

  // Convert to array for Recharts
  const data = Object.entries(totals).map(([category, amount]) => ({
    category,
    amount,
    percentage: 0, // Will be calculated
  }));

  // Calculate percentages
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  data.forEach(item => {
    item.percentage = ((item.amount / total) * 100).toFixed(1);
  });

  // Sort by amount descending
  data.sort((a, b) => b.amount - a.amount);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{CATEGORY_ICONS[data.category] || "📝"}</span>
            <span className="font-semibold text-gray-800">{data.category}</span>
          </div>
          <p className="text-lg font-bold text-gray-900">
            ₹{data.amount.toLocaleString('en-IN')}
          </p>
          <p className="text-sm text-gray-500">
            {data.percentage}% of total spending
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium text-gray-700">
              {CATEGORY_ICONS[entry.value] || "📝"} {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-200 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Category Data</h3>
        <p className="text-gray-500">Add transactions to see spending breakdown by category</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Spending by Category</h2>
          <p className="text-gray-600 text-sm mt-1">Breakdown of your expenses</p>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-lg">
          <p className="text-sm font-medium text-purple-700">
            {data.length} Categories
          </p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              outerRadius={110}
              innerRadius={70}
              paddingAngle={4}
              strokeWidth={2}
              stroke="#ffffff"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.category] ?? "#888888"}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Category breakdown list */}
      <div className="mt-6 space-y-3">
        {data.map((item, index) => (
          <div key={item.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: COLORS[item.category] }}
              />
              <span className="text-lg">{CATEGORY_ICONS[item.category] || "📝"}</span>
              <span className="font-medium text-gray-800">{item.category}</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">₹{item.amount.toLocaleString('en-IN')}</p>
              <p className="text-sm text-gray-500">{item.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
