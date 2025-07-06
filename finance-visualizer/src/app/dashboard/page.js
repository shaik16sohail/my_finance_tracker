"use client";
import MonthlyBarChart from "./MonthlyBarChart";
import CategoryPieChart from "./CategoryPieChart";
import SummaryRow from "./SummaryRow";


import { useEffect, useState } from "react";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);

  // Fetch all transactions once on load
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
    // Immediately update list with the new transaction
    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Tracker</h1>
      <TransactionForm onAdd={handleAdd} />
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


      <MonthlyBarChart transactions={transactions} />
      <CategoryPieChart transactions={transactions} />
      <SummaryRow transactions={transactions} />
    </div>
  );
}
