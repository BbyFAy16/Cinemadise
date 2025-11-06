import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function MovieDetail({ route, navigation }: any) {
  const { movie } = route.params || {};

  if (!movie) {
    return (
      <SafeAreaView style={styles.root}>
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 60 }}>
          Movie not found.
        </Text>
      </SafeAreaView>
    );
  }

  const cinemas = [
    { id: "1", name: "Cinema City", price: "UGX 20,000", distance: "2.5 km" },
    { id: "2", name: "SilverScreens", price: "UGX 21,000", distance: "3.1 km" },
    { id: "3", name: "Sunset Cinemas", price: "UGX 19,500", distance: "4.1 km" },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Poster header */}
        <ImageBackground
          source={movie.poster}
          style={styles.poster}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Details</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.posterBottom}>
            <Text style={styles.title}>{movie.title}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.meta}>⭐ {movie.rating}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.meta}>{movie.duration}</Text>
            </View>
            {movie.genres && (
              <View style={styles.genresRow}>
                {movie.genres.map((g: string) => (
                  <View key={g} style={styles.genreChip}>
                    <Text style={styles.genreText}>{g}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ImageBackground>

        {/* Plot */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Plot</Text>
          <Text style={styles.plot}>
            {movie.plot ||
              "A gripping story unfolds as the protagonist faces impossible odds, blending emotional depth with cinematic spectacle."}
          </Text>

          {/* Cinema pricing */}
          <Text style={[styles.sectionTitle, { marginTop: 28 }]}>
            Cinema Price Comparison
          </Text>
          {cinemas.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={styles.cinemaRow}
            >
              <View>
                <Text style={styles.cinemaName}>{c.name}</Text>
                <Text style={styles.cinemaMeta}>{c.distance}</Text>
              </View>
              <Text style={styles.cinemaPrice}>{c.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Buy Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.buyBtn}
          onPress={() => navigation.navigate("BuyScreen", { movie })}
        >
          <Text style={styles.buyText}>Buy Ticket</Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  poster: { width, height: height * 0.55, justifyContent: "flex-end" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  headerBar: {
    position: "absolute",
    top: 40,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { color: "#ff6b2f", fontWeight: "700", fontSize: 16 },
  posterBottom: { paddingHorizontal: 20, paddingBottom: 30 },
  title: {
    color: "#ff6b2f",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 6,
  },
  metaRow: { flexDirection: "row", alignItems: "center" },
  meta: { color: "#eee", fontSize: 14 },
  dot: { color: "#aaa", marginHorizontal: 6 },
  genresRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  genreChip: {
    borderColor: "#ff6b2f",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 6,
  },
  genreText: { color: "#ff6b2f", fontSize: 13 },
  content: { paddingHorizontal: 20, paddingVertical: 24 },
  sectionTitle: {
    color: "#ff6b2f",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  plot: {
    color: "#888",
    fontSize: 14,
    lineHeight: 20,
  },
  cinemaRow: {
    backgroundColor: "#e6e6e6ff",
    borderRadius: 10,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cinemaName: { color: "#ff6b2f", fontWeight: "700", fontSize: 15 },
  cinemaMeta: { color: "#888", fontSize: 12, marginTop: 2 },
  cinemaPrice: { color: "#ff6b2f", fontWeight: "700" },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#111",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  buyBtn: {
    backgroundColor: "#ff6b2f",
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buyText: { color: "#fff", fontSize: 16, fontWeight: "700", marginRight: 6 },
});
