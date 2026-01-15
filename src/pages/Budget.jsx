import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useUser from "../authentication/useUser";
import Loader from "../components/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useBudget from "../hooks/useBudget";
import BudgetList from "../components/BudgetList";
import useDashboard from "../hooks/useDashboard";
import { getCurrentMonthKey } from "../utils/dateUtils";

function Budget() {
  const { isLoading, isAuthenticated, user } = useUser();
  const { budgets, loading, addBudget, deleteBudget } = useBudget();
  const { getExpensesByMonth } = useDashboard(user?.id);

  const [category, setCategory] = useState("Other");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState("all");
  const [allMonths, setAllMonths] = useState([]);

  // Fetch expenses when user or selected month changes
  useEffect(() => {
    if (!user) return;
    async function fetchExpenses() {
      const monthToFetch =
        selectedMonth === "all" ? getCurrentMonthKey() : selectedMonth;
      const exp = await getExpensesByMonth(monthToFetch);
      setExpenses(exp);
    }
    fetchExpenses();
  }, [user, selectedMonth, getExpensesByMonth]);

  useEffect(() => {
    if (!budgets || budgets.length === 0) return;

    const months = budgets
      .map((b) => b.date?.slice(0, 7))
      .filter((v, i, arr) => v && arr.indexOf(v) === i);

    setAllMonths(months);

    if (selectedMonth === "all" && months.length > 0) {
      setSelectedMonth(months[months.length - 1]);
    }
  }, [budgets]);

  async function handleAdd() {
    if (!category || !amount || !date) {
      toast.error("Please fill all required fields!");
      return;
    }

    // 1. Add budget to DB
    await addBudget({ category, amount, date });

    // 2. CRITICAL: Immediately refresh expenses so calculation updates
    const updatedExp = await getExpensesByMonth(selectedMonth);
    setExpenses(updatedExp);

    setCategory("Other");
    setAmount("");
    setDate(null);
    toast.success("Budget added!");
  }

  const filteredBudgets =
    selectedMonth === "all"
      ? budgets
      : budgets.filter((b) => b.date?.slice(0, 7) === selectedMonth);

  const budgetsWithSpending = filteredBudgets.map((b) => {
    const spent = expenses
      .filter((exp) => exp.category === b.category)
      .reduce((s, it) => s + Number(it.amount || 0), 0);

    return {
      ...b,
      spent,
      remaining: b.amount - spent,
      percent: b.amount > 0 ? (spent / b.amount) * 100 : 0,
    };
  });

  if (isLoading) return <Loader />;
  if (!isAuthenticated)
    return <p className="mt-10 text-center">Please login to add budget.</p>;

  return (
    <div className="px-6 mx-auto mt-10 max-w-7xl">
      {/* Month Filter */}
      <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center">
        <label
          htmlFor="monthFilter"
          className="font-bold text-gray-700 dark:text-gray-200"
        >
          Select Month:
        </label>
        <select
          id="monthFilter"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500 sm:w-56 dark:bg-gray-800 dark:text-gray-200"
        >
          <option value="all">All Months</option>
          {allMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Grid Container - FIXED FOR DESKTOP */}
      <div className="grid items-start grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Add Budget Form Card */}
        <div className="flex flex-col justify-between w-full min-h-[16rem] p-6 border-2 border-blue-500 border-dashed shadow-xl bg-white dark:bg-gray-900 rounded-3xl">
          <h1 className="mb-2 text-xl font-extrabold text-center text-blue-600 dark:text-blue-400">
            Add Budget
          </h1>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 mb-2 border outline-none rounded-xl dark:bg-gray-800 dark:text-gray-200 focus:border-blue-500"
          >
            <option value="Groceries">🛍️ Groceries</option>
            <option value="Bills">📄 Bills</option>
            <option value="Food">🍕 Food</option>
            <option value="Entertainment">🎥🍿 Entertainment</option>
            <option value="Transportation">🚋 Transportation</option>
            <option value="Education">📚 Education</option>
            <option value="Shopping">✨ Shopping</option>
            <option value="Fuel">⛽ Fuel</option>
            <option value="Investment">💼 Investment</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="number"
            placeholder="Amount (e.g. 5000)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 mb-2 border outline-none rounded-xl dark:bg-gray-800 dark:text-gray-200 focus:border-blue-500"
          />

          <div className="w-full mb-3">
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              dateFormat="yyyy-MM-dd"
              className="w-full px-3 py-2 border outline-none rounded-xl dark:bg-gray-800 dark:text-gray-200 focus:border-blue-500"
              placeholderText="Select a date"
            />
          </div>

          <button
            onClick={handleAdd}
            className="w-full py-3 font-bold text-white transition-all bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 active:scale-95"
          >
            Create Budget
          </button>
        </div>

        {/* Budget Cards List */}
        <BudgetList
          budgets={budgetsWithSpending}
          loading={loading}
          handleDelete={deleteBudget}
        />
      </div>
    </div>
  );
}

export default Budget;
