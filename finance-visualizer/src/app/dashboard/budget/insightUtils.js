export function generateInsights(chartData) {
  let positives = [];
  let negatives = [];
  let suggestions = [];

  chartData.forEach(({ category, budget, actual }) => {
    if (actual === 0) {
      suggestions.push(
        `You did not spend anything on ${category}. Evaluate whether this category requires budgeting next month.`
      );
    } else if (actual <= budget) {
      positives.push(
        `You managed your spending well in ${category}, staying within the budget (₹${actual} spent out of ₹${budget}).`
      );
    } else {
      negatives.push(
        `You exceeded your budget in ${category} by ₹${actual - budget} (Spent ₹${actual}, Budget ₹${budget}).`
      );
      suggestions.push(
        `Consider reducing your expenses in ${category}, or revising the allocated budget if the spending is necessary.`
      );
    }
  });

  return {
    positives,
    negatives,
    suggestions,
  };
}
