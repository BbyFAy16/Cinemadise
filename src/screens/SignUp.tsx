import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CountryPicker, { Country } from "react-native-country-picker-modal";
import DateTimePicker from "@react-native-community/datetimepicker";

const SignUp = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<Country | null>(null);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const formattedDob = dob
    ? dob.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  const canContinue =
    firstName &&
    lastName &&
    dob &&
    phone &&
    country &&
    state &&
    city &&
    email &&
    agreeTerms;

  const handleContinue = () => {
    if (canContinue) {
      navigation.navigate("OtpVerify");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.header}>Create Your Account</Text>

          {/* FIRST NAME */}
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#aaa"
            value={firstName}
            onChangeText={setFirstName}
          />

          {/* LAST NAME */}
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#aaa"
            value={lastName}
            onChangeText={setLastName}
          />

          {/* DATE OF BIRTH */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: formattedDob ? "#888" : "#888" }}>
              {formattedDob || "Date of Birth (DD/MM/YYYY)"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dob || new Date(2005, 0, 1)}
              mode="date"
              display="spinner"
              textColor="#fff"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDob(selectedDate);
              }}
            />
          )}

          {/* PHONE + COUNTRY CODE */}
          <View style={styles.phoneRow}>
            <TouchableOpacity
              style={styles.countryBtn}
              onPress={() => setShowCountryPicker(true)}
            >
            <CountryPicker
            countryCode={country?.cca2 || "US"}
            visible={showCountryPicker}
            withFlag={false}
            withFilter
            withCallingCode
            withEmoji={false}
            onClose={() => setShowCountryPicker(false)}
            onSelect={setCountry}
          />
            </TouchableOpacity>

            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              placeholderTextColor="#aaa"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* LOCATION */}
          <TextInput
            style={styles.input}
            placeholder="State / Region"
            placeholderTextColor="#aaa"
            value={state}
            onChangeText={setState}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#aaa"
            value={city}
            onChangeText={setCity}
          />

          {/* EMAIL */}
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* TERMS */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            <View
              style={[
                styles.checkboxBox,
                agreeTerms && styles.checkboxBoxActive,
              ]}
            />
            <Text style={styles.checkboxText}>
              I agree to the Terms and Conditions and Privacy Policy
            </Text>
          </TouchableOpacity>

          {/* CONTINUE BUTTON */}
          <TouchableOpacity
            style={[
              styles.continueBtn,
              { opacity: canContinue ? 1 : 0.5 },
            ]}
            disabled={!canContinue}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>

          <Text style={styles.bottomText}>
            Already have an account?{" "}
            <Text
              style={{ color: "#ee481a" }}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 24 },
  header: {
    color: "#ee481a",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#e6e6e6ff",
    color: "#888",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 15,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  countryBtn: {
    backgroundColor: "#e6e6e6ff",
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 15,
  },
  codeText: {
    color: "#ee481a",
    fontWeight: "600",
    fontSize: 15,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#ee481a",
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxBoxActive: {
    backgroundColor: "#ee481a",
  },
  checkboxText: {
    color: "#aaa",
    fontSize: 13,
    flex: 1,
  },
  continueBtn: {
    backgroundColor: "#ee481a",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  bottomText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 16,
  },
});

export default SignUp;
