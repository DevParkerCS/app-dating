import * as ImagePicker from "expo-image-picker";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // or whatever icon library you're using
import { useUser } from "../../../../context/UserContext";
import { SelectionProps } from "../../ProfileSetup";
import styles from "./ImageSelectorStyles";
import { useState } from "react";
import { uploadImage } from "../../../../utils/UploadImage";
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";

export const ImageSelector = ({ setCurStep }: SelectionProps) => {
  const [tmpImages, setTmpImages] = useState<string[]>([]);
  const { user, setUser } = useUser();

  const pickImage = async () => {
    console.log("INHERE\n");
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        quality: 0,
        aspect: [4, 3],
        presentationStyle:
          ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
        selectionLimit: 6 - tmpImages.length,
      });

      if (!result.canceled && result.assets) {
        const pickedImage = result.assets[0];
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          pickedImage.uri,
          [{ resize: { width: 500 } }], // Adjust width (height scales to keep aspect ratio)
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        setTmpImages([...tmpImages, manipulatedImage.uri]);
      }
    } catch (error) {
      console.error("Error picking images:", error);
      alert("Error picking images");
    }
  };

  const removeImage = (indexToRemove: number) => {
    setTmpImages([...tmpImages.filter((_, index) => index !== indexToRemove)]);
  };

  const handleUpload = async () => {
    console.log("Uploading");
    if (user) {
      console.log("Into");

      for (let i = 0; i < tmpImages.length; i++) {
        try {
          const imageUrl = await uploadImage(tmpImages[i], user.id.toString());
          setUser((prevState) => {
            if (prevState == null) {
              return prevState;
            }
            return {
              ...prevState,
              imageUrls: [...prevState.imageUrls, imageUrl],
            };
          });
        } catch (e) {
          return;
        }
      }
      console.log("Uploaded");
      const response = await axios.patch(
        "http://10.20.8.13:3000/users/updateProfile",
        {
          user,
        }
      );
      setCurStep((prev) => prev + 1);
    }
  };
  console.log(tmpImages);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.imageGrid}>
        {tmpImages.map((uri, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}
            >
              <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}

        {tmpImages.length < 6 && (
          <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
            <Ionicons name="add-circle" size={40} color="#666" />
            <Text style={styles.addImageText}>Add Photo</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Text style={styles.helpText}>
        {tmpImages.length + "/6 photos selected`"}
      </Text>
      <Pressable onPress={handleUpload}>
        <Text>Upload</Text>
      </Pressable>
    </View>
  );
};
