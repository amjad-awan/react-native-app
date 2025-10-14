import React from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const data = [
  { id: "1", image: "https://picsum.photos/800/400?random=1" },
  { id: "2", image: "https://picsum.photos/800/400?random=2" },
  { id: "3", image: "https://picsum.photos/800/400?random=3" },
  { id: "4", image: "https://picsum.photos/800/400?random=4" },
];

export default function ImageCarousel() {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={200}
        autoPlay
        autoPlayInterval={2500}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        )}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f8f8f8",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
});
