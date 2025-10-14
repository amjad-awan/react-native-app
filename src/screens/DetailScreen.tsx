import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Item = {
  id: string;
  title: string;
  description: string;
  image?: string;
};

const DetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { id } = route.params;

  // Ideally load from AsyncStorage later
  const [item, setItem] = useState<Item | null>(null);

  // Mock data (you can replace this with global state / AsyncStorage later)
  const mockData: Item[] = [
    {
      id: "1",
      title: "Trending Video 1",
      description:
        "Awesome clip about travel and exploring new cultures around the world.",
      image: "https://placekitten.com/300/200",
    },
    {
      id: "2",
      title: "Funny Cats Compilation",
      description: "A hilarious compilation of funny cats doing silly things.",
      image: "https://placebear.com/300/200",
    },
    {
      id: "3",
      title: "Best Tech of 2025",
      description: "Overview of upcoming tech trends and innovations.",
      image: "https://placekitten.com/301/201",
    },
  ];

  useEffect(() => {
    const found = mockData.find((v) => v.id === id);
    setItem(found || null);
  }, [id]);

  if (!item) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Video Details</Text>
        <View style={{ width: 26 }} /> {/* spacer for symmetry */}
      </View>

      {/* Thumbnail */}
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}

      {/* Title */}
      <Text style={styles.title}>{item.title}</Text>

      {/* Description */}
      <Text style={styles.description}>{item.description}</Text>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="heart-outline" size={22} color="#ff3b30" />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="share-social-outline" size={22} color="#007aff" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="bookmark-outline" size={22} color="#000" />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    lineHeight: 22,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 30,
  },
  actionBtn: {
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#999",
  },
});
