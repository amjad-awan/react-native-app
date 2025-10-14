import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";

export default function AddButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.fabText}>＋</Text>
    </TouchableOpacity>
  );
}
