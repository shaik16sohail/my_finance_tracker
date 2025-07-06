// Enhanced SummaryRow Component  
"use client";

export default function SummaryRow({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-100 to-blue-200 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Summary Available</h3>
        <p className="text-gray-500">Add transactions to see your financial summary</p>
      </div>
    );
  }

  // Calculate all the stats
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const avgTransaction = total / transactions.length;

  // Most recent transaction
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  const latest = sorted[0];

  // Top category
  const categoryTotals = {};
  transactions.forEach((tx) => {
    const cat = tx.category || "Other";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + tx.amount;
  });

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  const breakdownRows = Object.entries(categoryTotals)
    .map(([cat, amt]) => ({ category: cat, amount: amt }))
    .sort((a, b) => b.amount - a.amount);

  const categoryIcons = {
    Food: "🍽️",
    Travel: "✈️", 
    Shopping: "🛍️",
    Health: "🏥",
    Other: "📝"
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Financial Summary</h2>
        <p className="text-gray-600">Overview of your spending patterns and insights</p>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-400 bg-opacity-30 p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <span className="text-blue-200 text-sm font-medium">Total Spent</span>
          </div>
          <p className="text-3xl font-bold">₹{total.toLocaleString('en-IN')}</p>
          <p className="text-blue-200 text-sm mt-1">{transactions.length} transactions</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-400 bg-opacity-30 p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-green-200 text-sm font-medium">Average</span>
          </div>
          <p className="text-3xl font-bold">₹{avgTransaction.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          <p className="text-green-200 text-sm mt-1">per transaction</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-400 bg-opacity-30 p-3 rounded-lg">
              <span className="text-2xl">{categoryIcons[topCategory?.[0]] || "📝"}</span>
            </div>
            <span className="text-purple-200 text-sm font-medium">Top Category</span>
          </div>
          <p className="text-xl font-bold">{topCategory?.[0] || "None"}</p>
          <p className="text-purple-200 text-sm mt-1">₹{topCategory?.[1]?.toLocaleString('en-IN') || "0"}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-400 bg-opacity-30 p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-orange-200 text-sm font-medium">Latest</span>
          </div>
          <p className="text-lg font-bold truncate">{latest.description}</p>
          <p className="text-orange-200 text-sm mt-1">
            {latest.category} • ₹{latest.amount.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Detailed Category Breakdown */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Category Breakdown</h3>
          <p className="text-gray-600 text-sm mt-1">Detailed spending by category</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {breakdownRows.map((row, index) => {
              const percentage = ((row.amount / total) * 100).toFixed(1);
              return (
                <div key={row.category} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-lg">{categoryIcons[row.category] || "📝"}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{row.category}</p>
                        <p className="text-sm text-gray-500">{percentage}% of total</p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{row.amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}