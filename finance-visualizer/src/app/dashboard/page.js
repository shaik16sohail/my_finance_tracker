"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import MonthlyBarChart from "./MonthlyBarChart";
import CategoryPieChart from "./CategoryPieChart";
import SummaryRow from "./SummaryRow";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to load transactions", err);
    }
  };

  const handleAdd = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Personal Finance Tracker
            </h1>
            <p className="text-gray-600">Manage your expenses and track your financial goals</p>
          </div>
          <button
            onClick={() => router.push("/dashboard/budget")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Go to Budget Planner
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">


          {/* Left side - Transaction List (60%) */}
          <div className="w-full lg:w-3/5 h-full">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
              </div>
              <div className="h-[70vh] overflow-y-auto p-6">
                <TransactionList
                  transactions={transactions}
                  onDelete={async (id) => {
                    const res = await fetch(`/api/transactions/${id}`, {
                      method: "DELETE",
                    });
                    if (res.ok) {
                      setTransactions((prev) => prev.filter((tx) => tx._id !== id));
                    }
                  }}
                  onEdit={async (id, updatedData) => {
                    const res = await fetch(`/api/transactions/${id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(updatedData),
                    });

                    if (res.ok) {
                      const updated = await res.json();
                      setTransactions((prev) =>
                        prev.map((tx) => (tx._id === id ? updated : tx))
                      );
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right side - Transaction Form (40%) */}
          <div className="w-full lg:w-2/5 h-full">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <TransactionForm onAdd={handleAdd} />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <MonthlyBarChart transactions={transactions} />
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <CategoryPieChart transactions={transactions} />
          </div>
        </div>

        {/* Summary Row */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <SummaryRow transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
