import {
  Animated,
  Button,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import styles, { performShakeAnimation } from "./LoginStyles";
import { useRef, useState } from "react";
import { isValidEmail, isValidPassword } from "../../../../utils/Auth";
import { Vibration } from "react-native";
import axios from "axios";
import { StoredUser, User, useUser } from "../../../../context/UserContext";

export const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const { logIn } = useUser();

  const handleChange = (input: string, cb: (input: string) => void) => {
    setPasswordError("");
    setEmailError("");
    setLoginError("");

    cb(input);
  };

  const handleSubmit = async () => {
    if (!isValidEmail(emailInput)) {
      setEmailError("Invalid Email Format");
      performShakeAnimation(shakeAnimation);
      Vibration.vibrate(500);
      return;
    } else if (!isValidPassword(passwordInput)) {
      setPasswordError("Invalid Password Format");
      performShakeAnimation(shakeAnimation);
      Vibration.vibrate(500);

      return;
    }
    setEmailError("");
    setPasswordError("");

    try {
      const response = await axios.post("http://10.20.8.13:3000/users/login", {
        email: emailInput,
        password: passwordInput,
      });

      if (response.data === null) {
        setLoginError("Invalid Email/Password");
        performShakeAnimation(shakeAnimation);
        Vibration.vibrate(500);
        return;
      } else {
        const user: StoredUser = response.data;
        console.log(user);
        logIn(user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginWrapper}>
        <Text style={styles.title}>Login</Text>
        <Animated.View
          style={[
            styles.inputsWrapper,
            {
              transform: [
                {
                  translateX: shakeAnimation,
                },
              ],
            },
          ]}
        >
          <View style={styles.inputWrapper}>
            <Text style={styles.errorTxt}>{loginError}</Text>
            <Text style={styles.errorTxt}>{emailError}</Text>
            <TextInput
              value={emailInput}
              onChangeText={(e) => handleChange(e, setEmailInput)}
              style={styles.input}
              placeholder="Email"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.errorTxt}>{passwordError}</Text>
            <TextInput
              value={passwordInput}
              onChangeText={(e) => handleChange(e, setPasswordInput)}
              style={styles.input}
              secureTextEntry
              placeholder="Password"
            />
          </View>
        </Animated.View>
        <Pressable style={styles.inputBtn} onPress={() => handleSubmit()}>
          <Text style={styles.inputBtnTxt}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};
