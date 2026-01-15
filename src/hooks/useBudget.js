import { useState, useEffect, useCallback } from "react";
import supabase from "../services/supabase";
import toast from "react-hot-toast";
import useUser from "../authentication/useUser";
import { formatDateISO, getMonthKeyFromDate } from "../utils/dateUtils";

export default function useBudget() {
  const { user, isAuthenticated } = useUser();
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all budgets
  const fetchBudgets = useCallback(
    async (monthKey) => {
      if (!user) return;
      setLoading(true);

      let query = supabase
        .from("Budget")
        .select("*")
        .eq("user_id", user.id)
        .order("id", { ascending: false });
      if (monthKey) query = query.eq("month", monthKey);

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching budgets:", error.message);
      } else {
        setBudgets(data);
      }

      setLoading(false);
    },
    [user]
  );

  useEffect(() => {
    if (isAuthenticated) fetchBudgets();
  }, [isAuthenticated, fetchBudgets]);

  // Add budget
  const addBudget = async ({ category, amount, date }) => {
    if (!user) return { error: "User not found" };

    const month = getMonthKeyFromDate(date); // "2025-09"
    const dateIso = formatDateISO(date); // "2025-09-17" (example)

    const { data, error } = await supabase
      .from("Budget")
      .insert([
        {
          category,
          amount: Number(amount),
          date: dateIso,
          month: month, // NEW: store month key for quick filtering
          user_id: user.id,
        },
      ])
      .select()
      .single();

    if (!error) {
      setBudgets((prev) => [data, ...prev]);
      toast.success("Budget added successfully!");
    } else {
      toast.error("Failed to add budget.");
    }

    return { data, error };
  };

  // Delete budget
  const deleteBudget = async (id) => {
    if (!user) return { error: "User not found" };

    const { error } = await supabase
      .from("Budget")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (!error) {
      setBudgets((prev) => prev.filter((inc) => inc.id !== id));
      toast.success("Budget deleted successfully!");
    } else {
      toast.error("Couldn't delete the budget.");
    }

    return { error };
  };

  return { budgets, loading, addBudget, deleteBudget, fetchBudgets };
}
