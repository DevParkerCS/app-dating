import * as ImagePicker from "expo-image-picker";
import {
  View,
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
import { useEffect, useRef, useState } from "react";
import { getImages, uploadImage } from "../../../../utils/ImageUtils";
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";
import selectionStyle from "../../SelectionStyle";
import { ImageUrl } from "../../../../../../shared/types/user";
import { DisplayedImage } from "./components/DisplayedImage";

export const ImageSelector = ({ setCurStep }: SelectionProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [readyToUpload, setReadyToUpload] = useState(false);
  const { user, setUser } = useUser();
  const [tmpImages, setTmpImages] = useState<ImageUrl[]>(user?.imageUrls || []);
  const [loadingImages, setLoadingImages] = useState(true);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    try {
      setIsValidating(true);
      // Opens OS image selection tool to choose up to the remaining amount
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        quality: 0,
        aspect: [9, 16],
        allowsMultipleSelection: true,
        presentationStyle:
          ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
        selectionLimit: 6 - tmpImages.length,
      });

      if (!result.canceled && result.assets) {
        const pickedImages = result.assets;

        // Loop through all async calls for parallel calls
        const manipulationPromises = pickedImages.map(async (image) => {
          const manipulatedImage = await ImageManipulator.manipulateAsync(
            image.uri,
            [{ resize: { width: 500 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
          );

          return { url: manipulatedImage.uri, is_new: true };
        });

        // Calls async functions parallel
        const newImages = await Promise.all(manipulationPromises);
        setTmpImages((prev) => [...prev, ...newImages]);
      }
      setIsValidating(false);
    } catch (error) {
      setIsValidating(false);
      console.error("Error picking images:", error);
      alert("Error picking images");
    }
  };

  const handleUpload = async () => {
    if (!user) return;

    setIsUploading(true);

    for (let i = 0; i < tmpImages.length; i++) {
      try {
        if (tmpImages[i].is_new) {
          const imageUrl = await uploadImage(tmpImages[i].url, user.id);

          setTmpImages((prev) => {
            const newTmp = [...prev];
            newTmp[i].is_new = false;
            newTmp[i].url = imageUrl;
            return newTmp;
          });
        }
      } catch (e) {
        console.error("Upload error:", e);
        return;
      }
    }

    setUser((prevState) =>
      prevState
        ? {
            ...prevState,
            imageUrls: tmpImages,
          }
        : null
    );

    setReadyToUpload(true);
  };

  const updateUser = async () => {
    try {
      // Figure out if tmpImages is what I should use.
      const response = await axios.patch(
        "http://10.20.8.13:3000/users/updateImages",
        {
          images: tmpImages,
          id: user?.id,
        }
      );
      setIsUploading(false);
    } catch (e) {
      console.log("Error updating user", e);
      throw e;
    }
  };

  const handleUploadClick = async () => {
    try {
      await handleUpload();
    } catch (e) {
      console.log("Error in upload click");
    }
  };

  useEffect(() => {
    if (readyToUpload) {
      setReadyToUpload(false);
      const upload = async () => {
        try {
          await updateUser();
          setCurStep((prev) => prev + 1);
        } catch (e) {
          console.log("error updating user");
        }
      };

      upload();
    }
  }, [readyToUpload]);

  useEffect(() => {
    setLoadingImages(true);
    if (user) {
      const getAllImages = async () => {
        const urls = await getImages(user.id);
        setTmpImages((prev) => {
          const currentUrls = prev.map((img) => img.url);
          const newUrls = urls.filter((url) => !currentUrls.includes(url));
          const newEntries = newUrls.map((url) => ({ is_new: false, url }));
          return [...prev, ...newEntries];
        });
        setLoadingImages(false);
      };
      getAllImages();
    }
  }, []);

  return (
    <View style={[selectionStyle.container]}>
      <View style={selectionStyle.contentWrapper}>
        <Text style={selectionStyle.subTitle}>Let's Get Some Pics!</Text>
        <ScrollView contentContainerStyle={styles.imageGrid}>
          {tmpImages.map((img, index) => (
            <DisplayedImage
              img={img}
              key={index}
              index={index}
              tmpImages={tmpImages}
              setTmpImages={setTmpImages}
            />
          ))}

          {tmpImages.length < 6 && (
            <TouchableOpacity
              style={styles.addImageButton}
              onPress={
                !isUploading && !isValidating && !loadingImages
                  ? pickImage
                  : () => {}
              }
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

        {loadingImages ? (
          <View>
            <Text style={styles.loadingTxt}>Loading Images...</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.helpText}>
              {tmpImages.length + "/6 photos selected"}
            </Text>
            {isUploading ? (
              <View>
                <Text style={styles.uploadingTxt}>Uploading Images...</Text>
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <Pressable
                style={selectionStyle.btn}
                disabled={isValidating || isUploading}
                onPress={handleUploadClick}
              >
                <Text style={selectionStyle.btnTxt}>
                  {isValidating ? "Validating Images..." : "Upload"}
                </Text>
              </Pressable>
            )}
          </View>
        )}
      </View>
    </View>
  );
};
