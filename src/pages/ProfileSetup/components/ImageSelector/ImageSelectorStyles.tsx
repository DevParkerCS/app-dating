import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 10,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 10,
    padding: 10,
  },
  imageContainer: {
    width: "31%", // Approximately 3 images per row with gap
    aspectRatio: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    right: -10,
    top: -10,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 2,
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
});
