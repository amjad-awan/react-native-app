import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import uuid from "react-native-uuid";
import ExpenseForm from "../components/expense/ExpenseForm";
import ExpenseList from "../components/expense/ExpenseList";

interface Expense {
  id: string;
  title: string;
  amount: string;
}

const ExpenseTrackerScreen = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await AsyncStorage.getItem("expenses");
      if (data) setExpenses(JSON.parse(data));
    } catch (error) {
      console.log("Error loading expenses:", error);
    }
  };

  const saveExpenses = async (updated: Expense[]) => {
    setExpenses(updated);
    await AsyncStorage.setItem("expenses", JSON.stringify(updated));
  };

  const handleAddOrEdit = async (expense: any) => {
    if (expense.id) {
      const updated = expenses.map((e) => (e.id === expense.id ? expense : e));
      await saveExpenses(updated);
      setEditingExpense(null);
    } else {
      const newExpense = { ...expense, id: uuid.v4() as string };
      await saveExpenses([...expenses, newExpense]);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Expense", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const updated = expenses.filter((e) => e.id !== id);
          await saveExpenses(updated);
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={styles.title}>💰 Expense Tracker</Text>
      <ExpenseForm onSubmit={handleAddOrEdit} editingExpense={editingExpense} />
      <ExpenseList
        expenses={expenses}
        onEdit={(item) => setEditingExpense(item)}
        onDelete={handleDelete}
      />
    </ScrollView>
  );
};

export default ExpenseTrackerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f3f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
});
