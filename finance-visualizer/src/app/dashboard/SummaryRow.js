"use client";

export default function SummaryRow({ transactions }) {
  if (!transactions || transactions.length === 0) return null;

  // 💰 Total spent
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  // 🧾 Most recent transaction
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const latest = sorted[0];

  // 🏆 Top category
  const categoryTotals = {};
  transactions.forEach((tx) => {
    const cat = tx.category || "Other";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + tx.amount;
  });

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  const breakdownRows = Object.entries(categoryTotals).map(([cat, amt]) => ({
    category: cat,
    amount: amt,
  }));

  return (
    <div className="my-6 max-w-5xl mx-auto space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm text-gray-500">Total Spent</h3>
          <p className="text-2xl font-bold text-blue-600">₹{total}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm text-gray-500">Most Recent</h3>
          <p className="text-md font-medium">{latest.description}</p>
          <p className="text-sm text-gray-400">
            {latest.category} • ₹{latest.amount}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm text-gray-500">Top Category</h3>
          <p className="text-md font-medium">{topCategory?.[0]}</p>
          <p className="text-sm text-gray-400">₹{topCategory?.[1]}</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Category Breakdown</h3>
        <ul className="divide-y divide-gray-100 text-sm">
          {breakdownRows.map((row) => (
            <li key={row.category} className="flex justify-between py-1">
              <span>{row.category}</span>
              <span className="font-medium text-gray-700">₹{row.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
