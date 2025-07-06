"use client";

import { useState } from "react";
import { generateInsights } from "./insightUtils";

export default function AIInsights({ chartData, selectedMonth }) {
  const [insights, setInsights] = useState(null);

  const handleGenerate = () => {
    const generated = generateInsights(chartData);
    setInsights(generated);
  };

  if (!chartData || chartData.length === 0 || chartData === "no-budget") {
    return null;
  }

  return (
    <div className="mt-6 p-6 border rounded-lg bg-white shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Spending Analysis & Insights
      </h3>

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Generate Insights
      </button>

      {insights && (
        <div className="mt-6 space-y-6 text-gray-800 text-base leading-relaxed">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2 border-b pb-1">
              Positive Observations
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              {insights.positives.length > 0 ? (
                insights.positives.map((point, idx) => <li key={idx}>{point}</li>)
              ) : (
                <li>No positive observations for this month.</li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2 border-b pb-1">
              Areas for Improvement
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              {insights.negatives.length > 0 ? (
                insights.negatives.map((point, idx) => <li key={idx}>{point}</li>)
              ) : (
                <li>No overspending detected this month.</li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2 border-b pb-1">
              Suggestions
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              {insights.suggestions.length > 0 ? (
                insights.suggestions.map((point, idx) => <li key={idx}>{point}</li>)
              ) : (
                <li>No additional suggestions. Great job!</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
