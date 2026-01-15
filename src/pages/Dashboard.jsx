import { useEffect, useState } from "react";
import useUser from "../authentication/useUser";
import useDashboard from "../hooks/useDashboard";
import Loader from "../components/Loader";
import Stats from "../components/Stats";
import toast from "react-hot-toast";
import { getCurrentMonthKey } from "../utils/dateUtils";

function Dashboard() {
  const { user, isLoading, isAuthenticated } = useUser();
  const { getDashboardData, getChartData } = useDashboard(user?.id);

  const [chartData, setChartData] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0 });
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMonth, setSelectedMonth] = useState("all");
  const [allMonths, setAllMonths] = useState([]);

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      setLoading(true);

      const chartDataAll = await getChartData();
      chartDataAll.sort(
        (a, b) => new Date(a.month + "-01") - new Date(b.month + "-01")
      );
      setChartData(chartDataAll);

      const months = chartDataAll
        .map((d) => d.month)
        .filter((v, i, arr) => arr.indexOf(v) === i);
      setAllMonths(months);

      const defaultMonth =
        chartDataAll.length > 0
          ? chartDataAll[chartDataAll.length - 1].month
          : getCurrentMonthKey();
      setSelectedMonth(defaultMonth);

      const { budgetStatus, totalIncome, totalExpense, expenses } =
        await getDashboardData(defaultMonth);

      setBudgets(budgetStatus);
      setTotals({ income: totalIncome, expense: totalExpense });
      setExpenses(expenses);

      setLoading(false);
    }

    fetchData();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    async function updateMonthData() {
      setLoading(true);

      const monthKey =
        selectedMonth === "all" ? getCurrentMonthKey() : selectedMonth;

      const { budgetStatus, totalIncome, totalExpense, expenses } =
        await getDashboardData(monthKey);

      setBudgets(budgetStatus);
      setTotals({ income: totalIncome, expense: totalExpense });
      setExpenses(expenses);

      const chartDataAll = await getChartData();
      const filteredChartData =
        selectedMonth === "all"
          ? chartDataAll
          : chartDataAll.filter((d) => d.month === selectedMonth);

      filteredChartData.sort(
        (a, b) => new Date(a.month + "-01") - new Date(b.month + "-01")
      );
      setChartData(filteredChartData);

      setLoading(false);
    }

    updateMonthData();
  }, [selectedMonth, user]);

  if (!user) return null;
  if (!isAuthenticated) {
    toast.error("Please login to see dashboard.");
    return null;
  }
  if (isLoading) return <Loader />;

  return (
    <div className="max-w-6xl px-4 mx-auto">
      {/* Title */}
      <h1 className="text-2xl font-bold dark:text-gray-100">Dashboard</h1>

      {/* Month Filter */}
      <div className="flex flex-col gap-2 mt-4 sm:flex-row sm:items-center dark:text-gray-500">
        <label htmlFor="monthFilter" className="font-medium">
          Select Month:
        </label>

        <select
          id="monthFilter"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-3 py-2 border rounded-md shadow-sm sm:w-48"
        >
          <option value="all">All Months</option>
          {allMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Section */}
      <div className="mt-6">
        <Stats
          chartData={chartData}
          totals={totals}
          budgets={budgets}
          expenses={expenses}
          selectedMonth={selectedMonth}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default Dashboard;
