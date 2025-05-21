import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    minHeight: "100%",
  },
  titleWrapper: {},
  titleTxt: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 8,
    paddingBottom: 8,
  },
  chatsWrapper: {
    marginBottom: 45,
  },
  chatWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(black,0.7)",
  },
  chatPic: {
    width: 75,
    height: 75,
  },
  chatTxtWrapper: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 16,
    overflow: "hidden",
    maxWidth: "50%",
  },
  chatName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  chatTxt: {
    fontSize: 16,
    maxWidth: "100%",
  },
});
