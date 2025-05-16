import { Animated, Dimensions, Easing, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  loginWrapper: {
    width: "90%",
    padding: 20,
    borderRadius: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 34,
    marginBottom: 10,
  },
  inputsWrapper: {
    width: "100%",
  },
  inputWrapper: {
    marginVertical: 5,
    width: "100%",
  },
  input: {
    width: "100%",
    marginVertical: 4,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    backgroundColor: "#fafafa",
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
  },
  errorTxt: {
    color: "red",
    position: "absolute",
    top: -12,
    left: 0, // Ensure it's aligned with input
  },
  inputBtn: {
    width: "100%", // Full width
    marginTop: 16,
    backgroundColor: "lightblue",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 15,
  },
  inputBtnTxt: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export const performShakeAnimation = (shakeAnimation: Animated.Value) => {
  Animated.sequence([
    // Move left
    Animated.timing(shakeAnimation, {
      toValue: -20, // Move 20 pixels to the left
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    // Move right
    Animated.timing(shakeAnimation, {
      toValue: 20, // Move 20 pixels to the right
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    // Return to original position
    Animated.timing(shakeAnimation, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ]).start();
};
