import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useMemo } from "react";
import Loader from "./Loader";

const COLORS = ["#4caf50", "#f44336", "#2196f3", "#ff9800", "#9c27b0"];

function Stats({
  chartData = [],
  budgets = [],
  expenses = [],
  selectedMonth,
  loading,
}) {
  const pieData = useMemo(() => {
    if (!expenses || expenses.length === 0) return [];

    const filteredExpenses =
      selectedMonth === "all"
        ? expenses
        : expenses.filter((e) => e.date?.slice(0, 7) === selectedMonth);

    const categoryTotals = filteredExpenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
      return acc;
    }, {});

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
  }, [expenses, selectedMonth]);

  return (
    <div className="mt-6 space-y-10">
      <h2 className="text-xl font-semibold dark:text-gray-100">📊 Overview</h2>

      {/* Bar Chart */}
      <div>
        <h3 className="mb-2 text-lg font-medium dark:text-gray-100">
          Income vs Expense
        </h3>
        <div className="w-full h-64 p-3 bg-gray-200 shadow-md sm:p-4 dark:bg-gray-700 rounded-2xl sm:h-72">
          {loading ? (
            <Loader />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="bottom" height={30} />
                <Bar dataKey="income" fill="#4caf50" />
                <Bar dataKey="expense" fill="#f44336" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Pie Chart */}
      <div>
        <h3 className="mb-2 text-lg font-medium dark:text-gray-100">
          Expense Breakdown ({selectedMonth})
        </h3>
        <div className="w-full p-3 bg-gray-200 shadow-md sm:p-4 dark:bg-gray-700 rounded-2xl h-72 sm:h-80">
          {loading ? (
            <Loader />
          ) : pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={false}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={30} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No expenses found for this month.
            </p>
          )}
        </div>
      </div>

      {/* Budget Summary */}
      <div>
        <h3 className="mb-3 text-lg font-medium dark:text-gray-100">
          💰 Budget Summary
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {budgets.map((b) => (
            <div
              key={b.id}
              className="p-4 bg-gray-200 shadow rounded-xl dark:bg-gray-700 dark:text-gray-100"
            >
              <h2 className="font-semibold">{b.category}</h2>
              <p>Budget: Rs.{b.amount}</p>
              <p>Spent: Rs.{b.spent}</p>
              <p className={b.overspent ? "text-red-500" : "text-green-500"}>
                {b.overspent ? "⚠️ Overspent" : `Remaining: Rs.${b.remaining}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stats;
