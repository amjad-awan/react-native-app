import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const mockData = [
    { id: "1", title: "Trending Video 1", description: "Awesome clip about travel" },
    { id: "2", title: "Trending Video 2", description: "Funny cats compilation" },
    { id: "3", title: "Trending Video 3", description: "Best tech of 2025" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>For You 🎥</Text>

      {/* Feed */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {mockData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate("Detail", { id: item.id })}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
            <Text style={styles.cardLink}>Watch Now →</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  cardLink: {
    color: "#007bff",
    fontWeight: "500",
  },
});
