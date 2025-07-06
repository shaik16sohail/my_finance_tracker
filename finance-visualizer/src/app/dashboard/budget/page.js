"use client";

import { useEffect, useState } from "react";
import BudgetForm from "./BudgetForm";
import BudgetVsActualChart from "./BudgetVsActualChart";
import AIInsights from "./AIInsights";


export default function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchBudgets();
    fetchTransactions();
  }, []);

  useEffect(() => {
    generateChartData();
  }, [selectedMonth, budgets, transactions]);

  const fetchBudgets = async () => {
    try {
      const res = await fetch("/api/budgets");
      const data = await res.json();
      setBudgets(data);
    } catch (err) {
      console.error("Failed to load budgets", err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to load transactions", err);
    }
  };

  const handleAddBudget = (newBudget) => {
    setBudgets((prev) => {
      const exists = prev.find(
        (b) => b.category === newBudget.category && b.month === newBudget.month
      );
      if (exists) {
        return prev.map((b) =>
          b.category === newBudget.category && b.month === newBudget.month
            ? newBudget
            : b
        );
      } else {
        return [newBudget, ...prev];
      }
    });
  };

  const generateChartData = () => {
    if (!selectedMonth) {
      setChartData([]);
      return;
    }

    const budgetEntries = budgets.filter((b) => b.month === selectedMonth);
    if (budgetEntries.length === 0) {
      setChartData("no-budget");
      return;
    }

    const budgetMap = {};
    budgetEntries.forEach((b) => {
      budgetMap[b.category] = b.amount;
    });

    const actualMap = {};
    transactions.forEach((tx) => {
      const txMonth = new Date(tx.date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      if (txMonth === selectedMonth) {
        const cat = tx.category || "Other";
        actualMap[cat] = (actualMap[cat] || 0) + tx.amount;
      }
    });

    const allCategories = new Set([
      ...Object.keys(budgetMap),
      ...Object.keys(actualMap),
    ]);

    const chartArr = Array.from(allCategories).map((category) => ({
      category,
      budget: budgetMap[category] || 0,
      actual: actualMap[category] || 0,
    }));

    setChartData(chartArr);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Monthly Budgets</h1>

      <BudgetForm onAdd={handleAddBudget} />

      <div className="mt-6">
        <label className="block text-sm font-medium mb-1">Select Month to Compare</label>
        <input
          type="month"
          className="border px-3 py-2 rounded-md"
          onChange={(e) => {
            const date = new Date(e.target.value);
            const formatted = date.toLocaleString("default", {
              month: "short",
              year: "numeric",
            });
            setSelectedMonth(formatted);
          }}
        />
      </div>

      <BudgetVsActualChart data={chartData} />
      <AIInsights chartData={chartData} selectedMonth={selectedMonth} />
    </div>
  );
}
