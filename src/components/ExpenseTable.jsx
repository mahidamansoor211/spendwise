import { RiDeleteBin5Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import Loader from "./Loader";
import { useState } from "react";

function ExpenseTable({ expenses, loading, handleDelete, startEditing }) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  if (loading) return <Loader />;
  if (expenses.length === 0)
    return (
      <p className="mt-10 text-center text-gray-500">No expenses found.</p>
    );

  const currentExpenses = expenses.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );
  const totalPages = Math.ceil(expenses.length / rowsPerPage);

  return (
    <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-gray-900 dark:border-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs font-bold text-gray-600 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Amount (Rs)</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {currentExpenses.map((expense) => (
              <tr
                key={expense.id}
                className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="px-6 py-4 font-medium dark:text-gray-200">
                  {expense.category}
                </td>
                <td className="px-6 py-4 font-semibold text-blue-600 dark:text-gray-200">
                  {expense.amount}
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                  {expense.date}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => startEditing(expense)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <MdEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <RiDeleteBin5Line size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 p-4 border-t border-gray-100 dark:border-gray-800 sm:flex-row bg-gray-50 dark:bg-gray-900/50">
        <span className="text-xs text-gray-500">
          Showing {page + 1} of {totalPages} pages
        </span>
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 text-xs font-medium bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 text-xs font-medium bg-white border border-t border-b border-r border-gray-200 rounded-r-lg hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default ExpenseTable;
