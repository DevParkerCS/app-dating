import * as ImagePicker from "expo-image-picker";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../../../../context/UserContext";
import { SelectionProps } from "../../ProfileSetup";
import styles from "./ImageSelectorStyles";
import { useEffect, useState } from "react";
import { uploadImage } from "../../../../utils/UploadImage";
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";
import selectionStyle from "../../SelectionStyle";
import { ImageUrl } from "../../../../../../shared/types/user";

export const ImageSelector = ({ setCurStep }: SelectionProps) => {
  const [readyToUpload, setReadyToUpload] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const { user, setUser } = useUser();
  const [tmpImages, setTmpImages] = useState<ImageUrl[]>(user?.imageUrls || []);

  const pickImage = async () => {
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
        setIsValidating(true);
        const pickedImage = result.assets[0];
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          pickedImage.uri,
          [{ resize: { width: 500 } }], // Adjust width (height scales to keep aspect ratio)
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        setTmpImages([
          ...tmpImages,
          { url: manipulatedImage.uri, is_new: true },
        ]);
        setIsValidating(false);
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
    if (user) {
      setIsUploading(true);
      for (let i = 0; i < tmpImages.length; i++) {
        try {
          if (tmpImages[i].is_new) {
            const imageUrl = await uploadImage(
              tmpImages[i].url,
              user.id.toString()
            );
            setUser((prevState) => {
              if (prevState == null) {
                return prevState;
              }
              return {
                ...prevState,
                imageUrls: [
                  ...prevState.imageUrls,
                  { url: imageUrl, is_new: false },
                ],
              };
            });
          }
        } catch (e) {
          return;
        }
      }

      setReadyToUpload(true);
    }
  };

  const updateUser = async () => {
    const response = await axios.patch(
      "http://10.20.8.13:3000/users/updateProfile",
      {
        user,
      }
    );
    setIsUploading(false);
  };

  useEffect(() => {
    if (readyToUpload) {
      setReadyToUpload(false);
      updateUser();
      setCurStep((prev) => prev + 1);
    }
  }, [readyToUpload, user]);

  return (
    <View style={[selectionStyle.container]}>
      <View style={selectionStyle.contentWrapper}>
        <Text style={selectionStyle.subTitle}>Let's Get Some Pics!</Text>
        <ScrollView contentContainerStyle={styles.imageGrid}>
          {tmpImages.map((img, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: img.url }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(index)}
              >
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}

          {tmpImages.length < 6 && (
            <TouchableOpacity
              style={styles.addImageButton}
              onPress={!isUploading ? pickImage : () => {}}
            >
              {!isValidating ? (
                <>
                  <Ionicons name="add-circle" size={40} color="#666" />
                  <Text style={styles.addImageText}>Add Photo</Text>
                </>
              ) : (
                <ActivityIndicator size={"large"} />
              )}
            </TouchableOpacity>
          )}
        </ScrollView>

        <Text style={styles.helpText}>
          {tmpImages.length + "/6 photos selected`"}
        </Text>
        {isUploading ? (
          <View>
            <Text>Uploading Images</Text>
            <ActivityIndicator />
          </View>
        ) : (
          <Pressable style={selectionStyle.btn} onPress={handleUpload}>
            <Text style={selectionStyle.btnTxt}>Upload</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};
