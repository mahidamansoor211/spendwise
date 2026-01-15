import { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";
import useUser from "../authentication/useUser";
import IncomeList from "../components/IncomeList";
import Loader from "../components/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useIncomes from "../hooks/useIncome";
import useDashboard from "../hooks/useDashboard";
import { getCurrentMonthKey } from "../utils/dateUtils";

function Income() {
  const { isLoading, isAuthenticated, user } = useUser();
  const { incomes, loading, addIncome, deleteIncome } = useIncomes();
  const { getExpensesByMonth } = useDashboard(user?.id);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [emoji, setEmoji] = useState("💰");
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(null);

  const [expenses, setExpenses] = useState([]);

  // fetch expenses for current month
  useEffect(() => {
    if (!user) return;
    async function fetchExpenses() {
      const exp = await getExpensesByMonth(getCurrentMonthKey());
      setExpenses(exp);
    }
    fetchExpenses();
  }, [user]);

  const incomesWithSpending = incomes.map((inc) => {
    const spent = expenses.reduce(
      (sum, exp) => sum + Number(exp.amount || 0),
      0
    );

    return {
      ...inc,
      spent,
      remaining: inc.amount - spent,
      percent: Math.min((spent / inc.amount) * 100, 200),
    };
  });

  async function handleAdd() {
    if (!name || !amount || !date) {
      toast.error("Please fill all required fields!");
      return;
    }

    await addIncome({ name, amount, emoji, date });

    // reset form
    setName("");
    setAmount("");
    setEmoji("💰");
    setDate(null);
  }

  if (isLoading) return <Loader />;
  if (!isAuthenticated)
    return <p className="mt-10 text-center">Please login to add income.</p>;

  return (
    <div className="max-w-4xl px-4 mx-auto sm:px-6">
      {/* Form Card */}
      <div className="w-full max-w-md p-5 mx-auto mt-10 shadow-lg bg-slate-200 dark:bg-gray-900 rounded-2xl">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Add Income Source
        </h1>

        {/* Name */}
        <div className="mt-3 dark:text-gray-100">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            placeholder="e.g. YouTube, Salary"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Amount */}
        <div className="mt-3 dark:text-gray-100">
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            placeholder="e.g. 5000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Emoji Picker */}
        <div className="relative mt-3 dark:text-gray-100">
          <label className="block mb-1">Emoji</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={emoji}
              readOnly
              className="w-full px-3 py-2 border rounded-md"
            />
            <button
              type="button"
              onClick={() => setShowPicker((prev) => !prev)}
              className="px-3 py-2 text-white bg-blue-600 rounded-md"
            >
              😀
            </button>
          </div>
          {showPicker && (
            <div className="absolute left-0 z-50 top-16 sm:left-auto sm:right-0">
              <EmojiPicker onEmojiClick={(e) => setEmoji(e.emoji)} />
            </div>
          )}
        </div>

        {/* Date */}
        <div className="mt-3 dark:text-gray-100">
          <label className="block mb-1">Date</label>
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            dateFormat="yyyy-MM-dd"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Select a date"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          className="w-full py-2 mt-5 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Income List */}
      <div className="mt-10">
        <IncomeList
          incomes={incomesWithSpending}
          loading={loading}
          handleDelete={deleteIncome}
        />
      </div>
    </div>
  );
}

export default Income;
