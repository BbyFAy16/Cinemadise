import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export default function ReceiptScreen({ route, navigation }: any) {
  const { movie, selectedSeats, total, paymentMethod } = route.params || {};
  const receiptRef = useRef<View>(null);

  const handleDownload = async () => {
    try {
      const uri = await captureRef(receiptRef, {
        format: "png",
        quality: 1,
      });

      const pdfName = `Cinemadise_Ticket_${Date.now()}.png`;
      const dest = `${FileSystem.documentDirectory}${pdfName}`;
      await FileSystem.moveAsync({ from: uri, to: dest });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(dest);
      } else {
        Alert.alert("Saved", "Ticket image saved to files.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not download the ticket.");
    }
  };

  const today = new Date();
  const dateStr = today.toLocaleDateString();
  const timeStr = today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Receipt</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Ticket */}
      <View style={styles.ticketWrapper} ref={receiptRef}>
        <View style={styles.ticket}>
          <Text style={styles.title}>{movie?.title}</Text>
          <Text style={styles.detailText}>{dateStr} • {timeStr}</Text>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Seats</Text>
            <Text style={styles.value}>{selectedSeats?.join(", ")}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Payment Method</Text>
            <Text style={styles.value}>{paymentMethod}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Total Paid</Text>
            <Text style={[styles.value, { color: "#ff6b2f" }]}>
              UGX {total.toLocaleString()}
            </Text>
          </View>

          <View style={styles.qrContainer}>
            <Image
              source={{
                uri: "https://api.qrserver.com/v1/create-qr-code/?data=CinemadiseTicket&size=150x150",
              }}
              style={styles.qrCode}
            />
          </View>

          <Text style={styles.footerNote}>
            Please present this ticket at the cinema gate.
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
          <MaterialCommunityIcons name="download" size={22} color="#fff" />
          <Text style={styles.downloadText}>Download Ticket</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.doneBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.doneText}>Done</Text>
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
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  ticketWrapper: {
    alignItems: "center",
    marginTop: 20,
  },
  ticket: {
    backgroundColor: "#e6e6e6ff",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    borderWidth: 1,
    borderColor: "#e6e6e6ff",
    shadowColor: "#ff6b2f",
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: { color: "#ff6b2f", fontSize: 20, fontWeight: "800", textAlign: "center" },
  detailText: {
    color: "#888",
    fontSize: 13,
    textAlign: "center",
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: { color: "#888", fontSize: 14 },
  value: { color: "#ff6b2f", fontWeight: "600", fontSize: 14 },
  qrContainer: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  qrCode: { width: 120, height: 120 },
  footerNote: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 10,
    fontSize: 12,
  },
  actions: {
    marginTop: 30,
    alignItems: "center",
    marginBottom: 60,
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff6b2f",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  downloadText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
  },
  doneBtn: {
    borderColor: "#ff6b2f",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  doneText: { color: "#ff6b2f", fontWeight: "700" },
});
