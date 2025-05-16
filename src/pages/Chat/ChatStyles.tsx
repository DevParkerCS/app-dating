import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  chatInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(0, 0, 0, 0.8)",
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  chatInfo: {
    flexDirection: "row",
    alignItems: "center",
    height: 75,
    zIndex: 5,
  },
  chatInfoIcon: {
    fontSize: 30,
  },
  goBack: {
    color: "red",
  },
  chatPic: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    resizeMode: "cover",
    overflow: "hidden",
  },

  chatName: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 12,
  },

  messagesWrapper: {
    width: "100%",
    flexDirection: "column-reverse",
    paddingHorizontal: 8,
    zIndex: 1,
    backgroundColor: "lightcyan",
  },
  txtBar: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    color: "white",
    padding: 16,
    fontSize: 18,
  },
});
