import Loader from "./Loader";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function BudgetList({ budgets, loading, handleDelete }) {
  if (loading) return <Loader />;

  if (budgets.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-7 dark:text-gray-200 col-span-full">
        No budgets found for this month.
      </p>
    );
  }

  return (
    <>
      {budgets.map((budget) => {
        // Choose bar color
        const barColor =
          budget.percent >= 100
            ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
            : budget.percent >= 80
            ? "bg-yellow-500"
            : "bg-green-500";

        const percentText =
          budget.percent > 100
            ? "Limit Exceeded!"
            : `${Math.round(budget.percent)}%`;

        return (
          <div
            key={budget.id}
            // Changed w-64 to w-full so it fills the grid cell properly
            className="relative flex flex-col p-6 border border-gray-200 shadow-xl bg-white rounded-3xl dark:bg-gray-900 dark:border-gray-800 min-h-[16rem] w-full"
          >
            {/* Delete button */}
            <button
              className="absolute text-xl text-gray-400 transition-colors top-4 right-4 hover:text-red-600"
              onClick={() => handleDelete(budget.id)}
            >
              <RiDeleteBin5Line />
            </button>

            {/* Date badge */}
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold text-blue-600 rounded-full bg-blue-50 w-fit dark:bg-blue-900/30 dark:text-blue-400">
              {budget.date}
            </span>

            {/* Category */}
            <h3 className="mb-1 text-xl font-bold text-gray-800 dark:text-gray-100">
              {budget.category}
            </h3>

            {/* Budget amounts */}
            <div className="mt-2 space-y-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Budget:{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  Rs.{budget.amount}
                </span>
              </p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Spent:{" "}
                <span
                  className={`${
                    budget.percent >= 100
                      ? "text-red-500"
                      : "text-gray-900 dark:text-white"
                  } font-bold`}
                >
                  Rs.{budget.spent}
                </span>
              </p>
            </div>

            {/* Progress bar container */}
            <div className="pt-4 mt-auto">
              <div className="flex items-end justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                  Usage
                </span>
                <span
                  className={`text-xs font-black ${
                    budget.percent >= 100 ? "text-red-500" : "text-blue-600"
                  }`}
                >
                  {percentText}
                </span>
              </div>
              <div className="w-full h-3 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-800">
                <div
                  className={`${barColor} h-3 rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${Math.min(budget.percent, 100)}%` }}
                ></div>
              </div>

              <p className="mt-3 text-xs font-bold text-center text-gray-400">
                {budget.remaining >= 0
                  ? `Rs.${budget.remaining} left to spend`
                  : `Overspent by Rs.${Math.abs(budget.remaining)}`}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
