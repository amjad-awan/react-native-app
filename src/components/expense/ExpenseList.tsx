import React, { useEffect, useRef } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import ExpenseItem from "./ExpenseItem";

interface ExpenseListProps {
  expenses: { id: string; title: string; amount: string }[];
  onEdit: (expense: any) => void;
  onDelete: (id: string) => void;
}

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onEdit,
  onDelete,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Smooth fade-in on mount
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  // Smooth layout transitions on add/delete
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [expenses]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {expenses.length === 0 ? (
        <Text style={styles.empty}>No expenses yet 😔</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExpenseItem
              expense={item}
              onEdit={() => onEdit(item)}
              onDelete={() => onDelete(item.id)}
            />
          )}
        />
      )}
    </Animated.View>
  );
};

export default ExpenseList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  empty: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 40,
  },
});
