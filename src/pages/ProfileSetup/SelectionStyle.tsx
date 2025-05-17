import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    height: "100%",
  },
  titleWrapper: {
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    textAlign: "center",
    fontWeight: "400",
  },
  subTitle: {
    fontSize: 30,
    marginBottom: 15,
    textAlign: "center",
  },
  btn: {
    width: "100%", // Full width
    marginTop: 16,
    backgroundColor: "lightblue",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 15,
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  contentWrapper: {
    position: "absolute",
    top: "40%",
    left: "50%",
    width: "90%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
  },
  inputsWrapper: {
    gap: 10,
  },
  txtInput: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#e0e0e0",
    backgroundColor: "#fafafa",
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
  },
});
