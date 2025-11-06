import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Local image imports (MUST be direct imports, not require)
import poster1 from "../assets/posters/poster1.jpg";
import poster2 from "../assets/posters/poster2.jpeg";
import poster3 from "../assets/posters/poster3.jpeg";
import poster4 from "../assets/posters/poster4.jpeg";

const { width, height } = Dimensions.get("window");

export default function Home({ navigation }: any) {
  const posters = [poster1, poster2, poster3, poster4];
  const [currentPoster, setCurrentPoster] = useState(0);
  const carouselRef = useRef<FlatList>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Auto-scroll banners
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentPoster + 1) % posters.length;
      setCurrentPoster(next);
      carouselRef.current?.scrollToIndex({ index: next, animated: true });
    }, 4000);
    return () => clearInterval(interval);
  }, [currentPoster]);

  const movies = [
    {
      id: "1",
      title: "Space Movie",
      price: "UGX 20,000",
      rating: 4.8,
      duration: "3h 1m",
      poster: poster1,
      genres: ["Action", "Sci-Fi", "Adventure"],
      plot:
        "A movie about a man stuck in spcae",
    },
    {
      id: "2",
      title: "The Batman",
      price: "UGX 18,500",
      rating: 4.7,
      duration: "2h 2m",
      poster: poster2,
      genres: ["Drama", "Crime"],
      plot:
        "The Batman must learn how to become Gothams protector against evil.",
    },
    {
      id: "3",
      title: "Dune",
      price: "UGX 19,000",
      rating: 4.6,
      duration: "2h 14m",
      poster: poster3,
      genres: ["Action", "Fantasy"],
      plot:
        "Paul Atriedes becomes the new duke.",
    },
  ];

  const cinemas = [
    { id: "c1", name: "Cinema City", location: "Kampala Rd • 2.5 km", screens: 3 },
    { id: "c2", name: "SilverScreens", location: "Garden City • 3.1 km", screens: 5 },
    { id: "c3", name: "Sunset Cinemas", location: "Acacia Mall • 4.1 km", screens: 4 },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const renderBanner = ({ item }: { item: any }) => (
    <View style={[styles.bannerCard, { width }]}>
      <Image source={item} style={styles.bannerImage} resizeMode="cover" />
      <View style={styles.bannerOverlay} />
      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerTitle}>Now Showing</Text>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => navigation.navigate("MovieDetail", { movie: movies[0] })}
        >
          <Text style={styles.bookText}>Book Now →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity>
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.logoText}>CINEMADISE</Text>
          <View style={styles.topIcons}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#fff"
              style={{ marginRight: 16 }}
            />
            <Image source={poster1} style={styles.avatar} />
          </View>
        </View>

        {/* Location Bar */}
        <View style={styles.locationBar}>
          <TouchableOpacity>
            <Text style={styles.locationText}>📍 Kampala, Uganda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateChip}>
            <Text style={styles.dateText}>📅 Today, Nov 15</Text>
          </TouchableOpacity>
        </View>

        {/* Carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={carouselRef}
            data={posters}
            keyExtractor={(_, i) => i.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={renderBanner}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setCurrentPoster(index);
            }}
          />
          <View style={styles.dotsRow}>
            {posters.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === currentPoster && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* Now Showing */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Now Showing</Text>
          <Text style={styles.allText}>All ></Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.movieScroll}
          contentContainerStyle={{ paddingHorizontal: 12 }}
        >
          {movies.map((movie) => (
            <TouchableOpacity
              key={movie.id}
              style={styles.movieCard}
              onPress={() => navigation.navigate("MovieDetail", { movie })}
            >
              <Image source={movie.poster} style={styles.movieImage} />
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {movie.rating}</Text>
              </View>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <Text style={styles.moviePrice}>{movie.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Cinemas */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Cinemas</Text>
        </View>

        {cinemas.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={styles.cinemaCard}
          >
            <View style={styles.cinemaIcon}>
              <MaterialCommunityIcons name="movie-open" size={22} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cinemaName}>{c.name}</Text>
              <Text style={styles.cinemaMeta}>{c.location}</Text>
              <Text style={styles.cinemaMeta}>{c.screens} screens</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ff6b2f" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#e6e6e6ff",
  },
  logoText: { color: "#e6e6e6ff", fontWeight: "800", fontSize: 18 },
  topIcons: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 32, height: 32, borderRadius: 16 },
  locationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#d4d2d2ff",
  },
  locationText: { color: "#fff", fontSize: 14 },
  dateChip: {
    backgroundColor: "rgba(255,107,47,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dateText: { color: "#ff6b2f", fontSize: 14 },
  carouselContainer: { marginTop: 10 },
  bannerCard: { width, height: height * 0.45, position: "relative" },
  bannerImage: { width: "100%", height: "100%" },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  bannerTextContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
  },
  bannerTitle: {
    color: "#ff6b2f",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 12,
  },
  bookBtn: {
    backgroundColor: "#ff6b2f",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  bookText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#555",
  },
  activeDot: { backgroundColor: "#ff6b2f" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  allText: { color: "#ff6b2f", fontSize: 14 },
  movieScroll: { marginBottom: 8 },
  movieCard: { width: 200, marginRight: 12 },
  movieImage: { width: "100%", height: 300, borderRadius: 12 },
  ratingBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: { color: "#fff", fontSize: 12 },
  movieTitle: {
    color: "#ff6b2f",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
  },
  moviePrice: {
    color: "#ff6b2f",
    fontSize: 14,
    fontWeight: "600",
  },
  cinemaCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6e6e6ff",
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  cinemaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ff6b2f",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cinemaName: {
    color: "#ff6b2f",
    fontWeight: "700",
    fontSize: 15,
  },
  cinemaMeta: {
    color: "#888",
    fontSize: 12,
  },
});
