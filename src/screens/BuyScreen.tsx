import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function BuyScreen({ route, navigation }: any) {
  const { movie } = route.params || {};
  const seatPrice = 20000; // UGX per seat
  const maxSeats = 5;

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatSelect = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((num) => num !== seatNumber));
    } else if (selectedSeats.length < maxSeats) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const total = selectedSeats.length * seatPrice;

  const seats = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#888" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Seats</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Movie Info */}
      {movie && (
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.movieSub}>
            {movie.duration} • {movie.genre || "Drama"} • UGX {seatPrice.toLocaleString()}
          </Text>
        </View>
      )}

      {/* Screen Label */}
      <View style={styles.screenBar}>
        <Text style={styles.screenText}>SCREEN</Text>
      </View>

      {/* Seat Grid */}
      <View style={styles.seatGrid}>
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat);
          return (
            <TouchableOpacity
              key={seat}
              style={[styles.seat, isSelected && styles.seatSelected]}
              onPress={() => handleSeatSelect(seat)}
            >
              <Text
                style={[styles.seatText, isSelected && styles.seatTextSelected]}
              >
                {seat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Legend */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: "#444" }]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: "#ff6b2f" }]} />
          <Text style={styles.legendText}>Selected</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: "#777" }]} />
          <Text style={styles.legendText}>Booked</Text>
        </View>
      </View>

      {/* Bottom Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryLeft}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>
            UGX {total.toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.proceedButton,
            { opacity: selectedSeats.length > 0 ? 1 : 0.5 },
          ]}
          disabled={selectedSeats.length === 0}
          onPress={() =>
            navigation.navigate("PaymentScreen", {
              movie,
              selectedSeats,
              total,
            })
          }
        >
          <Text style={styles.proceedText}>Continue</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
  },
  headerTitle: { color: "#ff6b2f", fontWeight: "700", fontSize: 16 },
  movieInfo: { padding: 20, backgroundColor: "#e6e6e6ff", alignItems: "center" },
  movieTitle: { color: "#ff6b2f", fontSize: 20, fontWeight: "800" },
  movieSub: { color: "#888", marginTop: 4 },
  screenBar: {
    alignItems: "center",
    backgroundColor: "#ff6b2f",
    marginHorizontal: 60,
    marginVertical: 16,
    borderRadius: 6,
    paddingVertical: 6,
  },
  screenText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  seatGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  seat: {
    width: 46,
    height: 46,
    borderRadius: 8,
    backgroundColor: "#e6e6e6ff",
    margin: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  seatSelected: { backgroundColor: "#ff6b2f" },
  seatText: { color: "#aaa", fontWeight: "600" },
  seatTextSelected: { color: "#fff" },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 14,
    marginBottom: 20,
  },
  legendItem: { flexDirection: "row", alignItems: "center" },
  legendBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: { color: "#ccc", fontSize: 12 },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: "#222",
    backgroundColor: "#111",
  },
  summaryLeft: {},
  totalLabel: { color: "#ccc", fontSize: 13 },
  totalAmount: { color: "#fff", fontSize: 18, fontWeight: "700" },
  proceedButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff6b2f",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  proceedText: { color: "#fff", fontWeight: "700", marginRight: 6 },
});
