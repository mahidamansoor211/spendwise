// hooks/useDashboard.js
import supabase from "../services/supabase";
import {
  getCurrentMonthKey,
  monthStartEndFromMonthKey,
  mergeMonthlyData,
} from "../utils/dateUtils";

function useDashboard(userId) {
  // Get data for a single month (totals + budgets)
  async function getDashboardData(monthKey = getCurrentMonthKey()) {
    const { start, end } = monthStartEndFromMonthKey(monthKey);

    // incomes for that month
    const { data: incomes = [] } = await supabase
      .from("Income")
      .select("*")
      .eq("user_id", userId)
      .gte("date", start)
      .lte("date", end);

    // expenses for that month
    const { data: expenses = [] } = await supabase
      .from("Expense")
      .select("*")
      .eq("user_id", userId)
      .gte("date", start)
      .lte("date", end);

    // budgets specifically for that month
    const { data: budgets = [] } = await supabase
      .from("Budget")
      .select("*")
      .eq("user_id", userId)
      .eq("month", monthKey);

    // sum totals
    const totalIncome = incomes.reduce(
      (s, it) => s + Number(it.amount || 0),
      0
    );
    const totalExpense = expenses.reduce(
      (s, it) => s + Number(it.amount || 0),
      0
    );

    // prepare budget status
    const budgetStatus = budgets.map((b) => {
      const spent = expenses
        .filter((exp) => exp.category === b.category)
        .reduce((s, it) => s + Number(it.amount || 0), 0);
      return {
        ...b,
        spent,
        remaining: Number(b.amount || 0) - spent,
        overspent: spent > Number(b.amount || 0),
      };
    });

    return {
      incomes,
      expenses,
      budgets,
      totalIncome,
      totalExpense,
      budgetStatus,
      monthKey,
    };
  }

  // Get multi-month chart data
  async function getChartData() {
    const { data: incomes = [] } = await supabase
      .from("Income")
      .select("*")
      .eq("user_id", userId);

    const { data: expenses = [] } = await supabase
      .from("Expense")
      .select("*")
      .eq("user_id", userId);

    const chartData = mergeMonthlyData(incomes, expenses);
    return chartData;
  }
  async function getExpensesByMonth(monthKey = getCurrentMonthKey()) {
    const { start, end } = monthStartEndFromMonthKey(monthKey);

    const { data: expenses = [] } = await supabase
      .from("Expense")
      .select("*")
      .eq("user_id", userId)
      .gte("date", start)
      .lte("date", end);

    return expenses;
  }

  return { getDashboardData, getChartData, getExpensesByMonth };
}

export default useDashboard;
