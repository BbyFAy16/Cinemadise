import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OtpVerify({ navigation }: any) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (index < 5 && text) {
        inputs.current[index + 1].focus();
      }
    } else if (text === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < 6) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
      return;
    }

    navigation.replace("Home");
  };

  const isFilled = otp.every((digit) => digit !== "");

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Verify OTP</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Enter the verification code</Text>
          <Text style={styles.subtitle}>
            We’ve sent a 6-digit code to your email / phone
          </Text>

          <Animated.View
            style={[
              styles.otpContainer,
              {
                transform: [{ translateX: shakeAnim }],
              },
            ]}
          >
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref!)}
                style={[styles.otpBox, digit ? styles.filledBox : null]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
                    inputs.current[index - 1].focus();
                  }
                }}
              />
            ))}
          </Animated.View>

          <TouchableOpacity
            style={[styles.verifyBtn, { opacity: isFilled ? 1 : 0.5 }]}
            disabled={!isFilled}
            onPress={handleVerify}
          >
            <Text style={styles.verifyText}>Verify</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("Resend code")}>
            <Text style={styles.resendText}>Didn’t get a code? Resend</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    color: "#ff6b2f",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 40,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#888",
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    backgroundColor: "#e6e6e6ff",
  },
  filledBox: {
    borderColor: "#ff6b2f",
    shadowColor: "#ff6b2f",
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  verifyBtn: {
    backgroundColor: "#ff6b2f",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginBottom: 20,
  },
  verifyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  resendText: {
    color: "#ff6b2f",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
