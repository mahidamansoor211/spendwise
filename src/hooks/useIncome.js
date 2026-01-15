import { useState, useEffect, useCallback } from "react";
import supabase from "../services/supabase";
import toast from "react-hot-toast";
import useUser from "../authentication/useUser";

export default function useIncomes() {
  const { user, isAuthenticated } = useUser();
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all incomes
  const fetchIncomes = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("Income")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching incomes:", error.message);
    } else {
      setIncomes(data);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) fetchIncomes();
  }, [isAuthenticated, fetchIncomes]);

  // Add income
  const addIncome = async ({ name, amount, emoji, date }) => {
    if (!user) return { error: "User not found" };

    const { data, error } = await supabase
      .from("Income")
      .insert([
        {
          name,
          amount: Number(amount),
          emoji,
          user_id: user.id,
          date: date.toISOString().split("T")[0],
        },
      ])
      .select()
      .single();

    if (!error) {
      setIncomes((prev) => [data, ...prev]);
      toast.success("Income added successfully!");
    } else {
      toast.error("Failed to add income.");
    }

    return { data, error };
  };

  // Delete income
  const deleteIncome = async (id) => {
    if (!user) return { error: "User not found" };

    const { error } = await supabase
      .from("Income")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (!error) {
      setIncomes((prev) => prev.filter((inc) => inc.id !== id));
      toast.success("Income deleted successfully!");
    } else {
      toast.error("Couldn't delete the income.");
    }

    return { error };
  };

  return { incomes, loading, addIncome, deleteIncome, fetchIncomes };
}
