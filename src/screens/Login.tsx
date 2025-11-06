import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    // Simulate login for demo
    if (email === "demo@cinemadise.com" && password === "123456") {
      Alert.alert("Welcome", "Login successful!");
      navigation.replace("Home");
    } else {
      Alert.alert("Invalid credentials", "Try demo@cinemadise.com / 123456");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Log in to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.btn,
          { backgroundColor: email && password ? "#ee481a" : "#ee481aa2" },
        ]}
        disabled={!email || !password}
        onPress={handleLogin}
      >
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupRow}>
        <Text style={styles.text}>Do not have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    color: "#ee481a",
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "#e6e6e6ff",
    color: "#888",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  forgot: {
    alignSelf: "flex-end",
    color: "#ee481a",
    marginBottom: 30,
  },
  btn: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  signupRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#aaa",
  },
  link: {
    color: "#ee481a",
    fontWeight: "700",
  },
});

export default Login;

// only creditentials that work: email: demo@cinemadise.com, password: 123456
