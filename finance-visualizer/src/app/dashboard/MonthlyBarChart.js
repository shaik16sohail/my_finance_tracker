"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function MonthlyBarChart({ transactions }) {
  // Group amounts by month
  const monthlyTotals = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const month = date.toLocaleString("default", { month: "short", year: "numeric" });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + tx.amount;
  });

  // Convert to array for Recharts and sort by date
  const chartData = Object.entries(monthlyTotals)
    .map(([month, total]) => ({
      month,
      total,
    }))
    .sort((a, b) => new Date(a.month) - new Date(b.month));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-blue-600 font-bold">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Monthly Data</h3>
        <p className="text-gray-500">Add transactions to see monthly spending trends</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Monthly Expenses</h2>
          <p className="text-gray-600 text-sm mt-1">Track your spending trends over time</p>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-lg">
          <p className="text-sm font-medium text-blue-700">
            Total Months: {chartData.length}
          </p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="total" 
              fill="url(#colorGradient)" 
              radius={[8, 8, 0, 0]}
              className="hover:opacity-80 transition-opacity"
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.7}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Highest spending: <span className="font-semibold text-blue-600">
            ₹{Math.max(...chartData.map(d => d.total)).toLocaleString('en-IN')}
          </span>
        </p>
      </div>
    </div>
  );
}
