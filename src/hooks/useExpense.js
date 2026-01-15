import { useState, useEffect, useCallback } from "react";
import supabase from "../services/supabase";
import useUser from "../authentication/useUser";
import toast from "react-hot-toast";

export default function useExpenses() {
  const { user, isAuthenticated } = useUser();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all expenses
  const fetchExpenses = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("Expense")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching expenses:", error.message);
    } else {
      setExpenses(data);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) fetchExpenses();
  }, [isAuthenticated, fetchExpenses]);

  // Add expense
  const addExpense = async ({ category, amount, date }) => {
    if (!user) return { error: "User not found" };

    const { data, error } = await supabase
      .from("Expense")
      .insert([
        {
          category,
          amount: Number(amount),
          date: date.toISOString().split("T")[0],
          user_id: user.id,
        },
      ])
      .select()
      .single();

    if (!error) {
      setExpenses((prev) => [data, ...prev]);
    }

    return { data, error };
  };

  // Update expense
  const updateExpense = async (id, { category, amount, date }) => {
    if (!user) return { error: "User not found" };

    const { data, error } = await supabase
      .from("Expense")
      .update({
        category,
        amount: Number(amount),
        date: date.toISOString().split("T")[0],
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (!error) {
      setExpenses((prev) => prev.map((exp) => (exp.id === id ? data : exp)));
    }

    return { data, error };
  };

  // Delete expense
  const deleteExpense = async (id) => {
    if (!user) return { error: "User not found" };

    const { error } = await supabase
      .from("Expense")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (!error) {
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
      toast.success("Expense deleted!");
    } else {
      toast.error("Couldn't delete expense.");
    }

    return { error };
  };

  return {
    expenses,
    loading,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };
}
