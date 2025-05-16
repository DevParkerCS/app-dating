import { StyleSheet } from "react-native";

export default StyleSheet.create({
  msgWrapper: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 8,
  },

  msg: {
    backgroundColor: "lightblue",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 15,
    maxWidth: "50%",
  },

  recvMsg: {
    borderBottomRightRadius: 0,
    backgroundColor: "lightgreen",
  },

  sentMsg: {
    marginLeft: "auto",
    borderBottomLeftRadius: 0,
  },
  msgTxt: {
    fontSize: 18,
  },
});
