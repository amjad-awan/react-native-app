import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

interface User {
  email: string;
  password: string;
}

const UsersScreen = () => {
  const [users, setUsers] = useState<User[]>([]);

  // 🔹 Fetch all users
  const fetchUsers = async () => {
    try {
      const data = await AsyncStorage.getItem("users");
      if (data) {
        setUsers(JSON.parse(data));
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log("Error loading users:", error);
    }
  };

  // 🔹 Delete user by email
  const handleDelete = async (email: string) => {
    Alert.alert("Confirm Delete", `Remove ${email}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const updated = users.filter((u) => u.email !== email);
            await AsyncStorage.setItem("users", JSON.stringify(updated));
            setUsers(updated);
          } catch (error) {
            console.log("Error deleting user:", error);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderUser = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Ionicons name="person-circle-outline" size={36} color="#333" />
        <Text style={styles.email}>{item.email}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.email)}
      >
        <Ionicons name="trash-outline" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Registered Users</Text>

      {users.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No registered users yet</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.email}
          renderItem={renderUser}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
    marginBottom: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  email: {
    fontSize: 16,
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#ff4d4f",
    padding: 8,
    borderRadius: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#777",
  },
});
