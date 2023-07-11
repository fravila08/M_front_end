import { useState, useContext } from "react";
import { UserContext } from "../utilities";
import {
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { tokenManagement } from "../utilities";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, axios } = useContext(UserContext);
  const navigate = useNavigation();

  const signUp = () => {
    axios
      .post("https://tango-dep.com/api/users/signup/", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        tokenManagement(response.data.token);
        setUser(response.data.user);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
      });
  };

  const logIn = () => {
    axios
      .post("https://tango-dep.com/api/users/login/", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        tokenManagement(response.data.token);
        setUser(response.data.user);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 250, height: 250, marginBottom: 0 }}
        />
        <Text style={{ marginTop: 0 }}>M Creating Mentors!</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <StatusBar style="auto" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => logIn()}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => signUp()}
        >
          <Text style={[styles.buttonText, styles.buttonOutlineText]}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C0C0C0",
    alignItems: "center",
  },
  input: {
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 8,
    margin: 5,
    borderRadius: 5,
  },
  inputContainer: {
    width: "80%",
    marginTop: 50,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
  },
});

export default SignUp;
