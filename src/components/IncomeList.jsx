import Loader from "./Loader";
import { RiDeleteBin5Line } from "react-icons/ri";

function IncomeList({ incomes, loading, handleDelete }) {
  if (loading) return <Loader />;

  if (incomes.length === 0) {
    return (
      <p className="mt-10 text-center text-gray-500 dark:text-gray-400">
        No incomes found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 mt-6 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {incomes.map((income) => {
        const barColor =
          income.percent >= 100
            ? "bg-red-500"
            : income.percent >= 80
            ? "bg-yellow-500"
            : "bg-green-500";
        const percentText =
          income.percent > 100 ? ">100%" : `${Math.round(income.percent)}%`;

        return (
          <div
            key={income.id}
            className="relative flex flex-col items-center p-5 bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-900 dark:border-gray-800"
          >
            <button
              className="absolute text-xl text-gray-400 hover:text-red-600 top-4 right-4"
              onClick={() => handleDelete(income.id)}
            >
              <RiDeleteBin5Line />
            </button>
            <span className="absolute text-[10px] font-medium text-gray-400 top-4 left-4 uppercase tracking-tighter">
              {income.date}
            </span>
            <div className="flex items-center justify-center mt-4 text-3xl bg-gray-100 rounded-full w-14 h-14 dark:bg-gray-800">
              {income.emoji}
            </div>
            <h3 className="mt-3 font-semibold text-gray-800 dark:text-gray-100">
              {income.name}
            </h3>
            <p className="text-xl font-bold text-blue-600">
              Rs.{income.amount}
            </p>
            <div className="w-full mt-4 space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Spent: {income.spent}</span>
                <span>Left: {income.remaining}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className={`${barColor} h-2 rounded-full transition-all`}
                  style={{ width: `${Math.min(income.percent, 100)}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-center text-gray-400 font-bold uppercase">
                {percentText}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default IncomeList;
