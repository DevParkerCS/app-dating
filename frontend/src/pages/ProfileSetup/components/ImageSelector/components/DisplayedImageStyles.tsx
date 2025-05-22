import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
    right: -5,
    top: -10,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 2,
  },
});
