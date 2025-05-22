import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "lightcyan",
    flex: 1,
  },
  homeWrapper: {
    padding: 16,
    position: "relative",
  },
  nameWrapper: {
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
  },
  profileImg: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    borderRadius: 15,
    overflow: "hidden",
  },
  profileImgWrapper: {
    marginTop: 8,
    marginBottom: 32,
  },
  promptWrapper: {
    height: 300,
    marginBottom: 32,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 15,
  },
  promptHeader: {
    fontSize: 25,
    marginTop: 32,
  },
  promptTxt: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 16,
  },
  buttonOptions: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
  iconWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "lightblue",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    marginRight: 8,
    boxShadow: "0 0 10px black",
  },
  iconOption: {
    fontSize: 35,
    color: "red",
    padding: 8,
  },
});
