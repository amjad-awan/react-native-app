import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

interface ExpenseFormProps {
  onSubmit: (expense: { id?: string; title: string; amount: string }) => void;
  editingExpense?: { id: string; title: string; amount: string } | null;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, editingExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
    }
  }, [editingExpense]);

  const handleSave = () => {
    if (!title || !amount) return;
    onSubmit({ id: editingExpense?.id, title, amount });
    setTitle("");
    setAmount("");
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Expense Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>
          {editingExpense ? "Update" : "Add"} Expense
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  input: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
