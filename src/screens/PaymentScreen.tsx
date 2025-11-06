import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

export default function PaymentScreen({ route, navigation }: any) {
  const { movie, selectedSeats, total } = route.params || {};
  const [method, setMethod] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    if (!method) {
      Alert.alert("Select Payment Method", "Please choose a payment method first.");
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      navigation.navigate("ReceiptScreen", {
        movie,
        selectedSeats,
        total,
        paymentMethod: method,
      });
    }, 2000);
  };

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#888" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.movieTitle}>{movie?.title}</Text>
        <Text style={styles.seatInfo}>
          Seats: {selectedSeats?.join(", ")} ({selectedSeats?.length})
        </Text>
        <Text style={styles.total}>Total: UGX {total.toLocaleString()}</Text>
      </View>

      {/* Payment Options */}
      <Text style={styles.sectionTitle}>Select Payment Method</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.option, method === "Card" && styles.optionActive]}
          onPress={() => setMethod("Card")}
        >
          <FontAwesome5 name="credit-card" size={20} color="#888" />
          <Text style={styles.optionText}>Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, method === "Mobile Money" && styles.optionActive]}
          onPress={() => setMethod("Mobile Money")}
        >
          <MaterialCommunityIcons name="cellphone" size={22} color="#888" />
          <Text style={styles.optionText}>Mobile Money</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, method === "Wallet" && styles.optionActive]}
          onPress={() => setMethod("Wallet")}
        >
          <Ionicons name="wallet-outline" size={22} color="#888" />
          <Text style={styles.optionText}>Wallet</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Inputs */}
      {method === "Card" && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            placeholderTextColor="#888"
            keyboardType="number-pad"
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.half]}
              placeholder="MM/YY"
              placeholderTextColor="#888"
              keyboardType="number-pad"
            />
            <TextInput
              style={[styles.input, styles.half]}
              placeholder="CVV"
              placeholderTextColor="#888"
              keyboardType="number-pad"
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Name on Card"
            placeholderTextColor="#888"
          />
        </View>
      )}

      {method === "Mobile Money" && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number (MTN/Airtel)"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
          />
        </View>
      )}

      {method === "Wallet" && (
        <View style={styles.walletCard}>
          <Ionicons name="wallet-outline" size={32} color="#ff6b2f" />
          <Text style={styles.walletBalance}>Balance: UGX 120,000</Text>
        </View>
      )}

      {/* Confirm Button */}
      <TouchableOpacity
        style={[
          styles.payButton,
          { opacity: method ? 1 : 0.5 },
        ]}
        disabled={!method || processing}
        onPress={handlePayment}
      >
        {processing ? (
          <Text style={styles.payText}>Processing...</Text>
        ) : (
          <Text style={styles.payText}>Pay Now</Text>
        )}
      </TouchableOpacity>
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
  headerTitle: { color: "#e6e6e6ff", fontWeight: "700", fontSize: 16 },
  summaryCard: {
    margin: 16,
    backgroundColor: "#e6e6e6ff",
    padding: 20,
    borderRadius: 12,
  },
  movieTitle: { color: "#ff6b2f", fontSize: 20, fontWeight: "800" },
  seatInfo: { color: "#888", marginTop: 4 },
  total: { color: "#ff6b2f", fontSize: 15, fontWeight: "700", marginTop: 8 },
  sectionTitle: {
    color: "#ff6b2f",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    marginLeft: 16,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  option: {
    backgroundColor: "#e6e6e6ff",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    width: 100,
  },
  optionActive: {
    backgroundColor: "#ff6b2f",
  },
  optionText: { color: "#888", marginTop: 6, fontWeight: "600" },
  form: { paddingHorizontal: 16, marginBottom: 20 },
  input: {
    backgroundColor: "#e6e6e6ff",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  half: { width: "48%" },
  walletCard: {
    backgroundColor: "#e6e6e6ff",
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  walletBalance: {
    color: "#ff6b2f",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
  },
  payButton: {
    backgroundColor: "#ff6b2f",
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 14,
    marginBottom: 40,
  },
  payText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
