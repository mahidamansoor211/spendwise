// src/utils/dateUtils.js

// -----------------------------
// Date formatting helpers
// -----------------------------

// Format local date -> YYYY-MM-DD (avoid timezone shift)
export function formatDateISO(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// monthKey "YYYY-MM" from Date or date string
export function getMonthKeyFromDate(d) {
  const date = new Date(d);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

// current month key
export function getCurrentMonthKey() {
  return getMonthKeyFromDate(new Date());
}

// produce month start/end strings for queries
export function monthStartEndFromMonthKey(monthKey) {
  // monthKey: "2025-09"
  const [yStr, mStr] = monthKey.split("-");
  const y = Number(yStr);
  const m = Number(mStr);
  const start = `${y}-${String(m).padStart(2, "0")}-01`;

  // JS trick: new Date(year, month, 0) => last day of previous month
  const lastDay = new Date(y, m, 0).getDate();
  const end = `${y}-${String(m).padStart(2, "0")}-${String(lastDay).padStart(
    2,
    "0"
  )}`;

  return { start, end };
}

// -----------------------------
// Monthly aggregation helpers
// -----------------------------

// Alternative name: getMonthKey for direct date string
export function getMonthKey(dateString) {
  if (!dateString) return null;
  return getMonthKeyFromDate(dateString);
}

// Group records (income/expense) by month
export function groupByMonth(records) {
  const monthlyTotals = {};

  records.forEach((rec) => {
    const monthKey = getMonthKey(rec.date || rec.Date); // support both
    if (!monthKey) return;

    if (!monthlyTotals[monthKey]) {
      monthlyTotals[monthKey] = 0;
    }
    monthlyTotals[monthKey] += Number(rec.amount);
  });

  return monthlyTotals; // e.g., { "2025-01": 2000, "2025-02": 1500 }
}

// Merge income + expenses into chart-ready format
export function mergeMonthlyData(incomes, expenses) {
  const incomeByMonth = groupByMonth(incomes);
  const expenseByMonth = groupByMonth(expenses);

  const allMonths = new Set([
    ...Object.keys(incomeByMonth),
    ...Object.keys(expenseByMonth),
  ]);

  // return array ready for recharts
  return Array.from(allMonths).map((monthKey) => ({
    month: monthKey,
    income: incomeByMonth[monthKey] || 0,
    expense: expenseByMonth[monthKey] || 0,
  }));
}
