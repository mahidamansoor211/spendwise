import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExpenseTable from "../components/ExpenseTable";
import useExpenses from "../hooks/useExpense";
import useUser from "../authentication/useUser";
import { getCurrentMonthKey } from "../utils/dateUtils";

function Expense() {
  const { isLoading, isAuthenticated } = useUser();
  const { expenses, loading, addExpense, updateExpense, deleteExpense } =
    useExpenses();

  const [category, setCategory] = useState("Other");
  const [amount, setAmount] = useState("");
  const [date, setdate] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Month filter state
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [allMonths, setAllMonths] = useState([]);

  // Get months list from expenses
  useEffect(() => {
    if (!expenses || expenses.length === 0) return;

    const months = expenses
      .map((e) => e.date?.slice(0, 7)) // YYYY-MM
      .filter((v, i, arr) => v && arr.indexOf(v) === i);

    setAllMonths(months);

    const defaultMonth =
      months.length > 0 ? months[months.length - 1] : getCurrentMonthKey();
    setSelectedMonth(defaultMonth);
  }, [expenses]);

  const filteredExpenses =
    selectedMonth === "all"
      ? expenses
      : expenses.filter((e) => e.date?.slice(0, 7) === selectedMonth);

  async function handleSubmit() {
    if (!category || !amount || !date) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (editingId) {
      const { error } = await updateExpense(editingId, {
        category,
        amount,
        date,
      });

      if (error) {
        toast.error("Couldn't update expense.");
      } else {
        toast.success("Expense updated!");
        resetForm();
      }
    } else {
      const { error } = await addExpense({ category, amount, date });

      if (error) {
        toast.error("Failed to add expense.");
      } else {
        toast.success("Expense added!");
        resetForm();
      }
    }
  }

  function startEditing(expense) {
    setCategory(expense.category);
    setAmount(expense.amount);
    setdate(new Date(expense.date));
    setEditingId(expense.id);
  }

  function resetForm() {
    setCategory("Other");
    setAmount("");
    setdate(null);
    setEditingId(null);
  }

  if (isLoading) return <Loader />;
  if (!isAuthenticated)
    return <p className="mt-10 text-center">Please login to add expense.</p>;

  return (
    <div className="max-w-5xl px-4 mx-auto mt-8 sm:px-6">
      {/* Form */}
      <div className="w-full max-w-md p-5 mx-auto shadow-lg bg-slate-200 dark:bg-gray-900 rounded-2xl">
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          {editingId ? "Edit Expense" : "Add Your Expenses"}
        </h1>

        {/* Category */}
        <div className="mt-3 dark:text-slate-500">
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Groceries">🛍️Groceries</option>
            <option value="Bills">📄Bills</option>
            <option value="Food">🍕Food</option>
            <option value="Entertainment">🎥🍿Entertainment</option>
            <option value="Transportation">🚋Transportation</option>
            <option value="Education">📚Education</option>
            <option value="Shopping">✨Shopping</option>
            <option value="Fuel">⛽Fuel</option>
            <option value="Investment">💼Investment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Amount */}
        <div className="mt-3 dark:text-gray-100">
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            placeholder="e.g. 5000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date */}
        <div className="mt-3 dark:text-gray-100">
          <label className="block mb-1 font-medium">Date</label>
          <DatePicker
            selected={date}
            onChange={(d) => setdate(d)}
            dateFormat="yyyy-MM-dd"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Select a date"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-5 sm:flex-row">
          <button
            onClick={handleSubmit}
            className="w-full py-2 text-white transition-colors bg-blue-600 rounded-md sm:w-1/2 hover:bg-blue-700"
          >
            {editingId ? "Update Expense" : "Add Expense"}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="w-full py-2 text-white transition-colors bg-gray-600 rounded-md sm:w-1/2 hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Month Filter */}
      <div className="flex flex-col gap-3 mt-6 sm:flex-row sm:items-center dark:text-gray-500">
        <label htmlFor="monthFilter" className="font-medium">
          Select Month:
        </label>
        <select
          id="monthFilter"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full px-3 py-2 border rounded-md shadow-sm sm:w-auto"
        >
          <option value="all">All Months</option>
          {allMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <ExpenseTable
          expenses={filteredExpenses}
          loading={loading}
          handleDelete={deleteExpense}
          startEditing={startEditing}
        />
      </div>
    </div>
  );
}

export default Expense;
