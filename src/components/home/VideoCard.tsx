import React from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";
import { styles } from "./styles";

export default function VideoCard({ item, onPress }: any) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {item.image && <Image source={{ uri: item.image }} style={styles.cardImage} />}
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDesc}>{item.description}</Text>
      <Text style={styles.cardLink}>Watch Now →</Text>
    </TouchableOpacity>
  );
}
