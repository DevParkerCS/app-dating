import { StyleSheet } from "react-native";

export default StyleSheet.create({
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  addImageButton: {
    width: "31%",
    height: "100%",
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: "#666",
    borderStyle: "dashed",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addImageText: {
    marginTop: 5,
    color: "#666",
    fontSize: 12,
  },
  helpText: {
    textAlign: "center",
    color: "#666",
    marginTop: 10,
  },
  uploadingTxt: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  loadingTxt: {
    marginTop: 10,
    fontSize: 23,
    textAlign: "center",
  },
});
