import { View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../../../../../context/UserContext";
import { useState } from "react";
import { deleteImage } from "../../../../../utils/ImageUtils";
import { ImageUrl } from "../../../../../../../shared/types/user";
import { FirebaseError } from "firebase/app";
import styles from "./DisplayedImageStyles";

type DisplayedImageProps = {
  img: ImageUrl;
  index: number;
  tmpImages: ImageUrl[];
  setTmpImages: React.Dispatch<React.SetStateAction<ImageUrl[]>>;
};

export const DisplayedImage = ({
  img,
  index,
  tmpImages,
  setTmpImages,
}: DisplayedImageProps) => {
  const { setUser } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);

  const removeImage = async (indexToRemove: number) => {
    try {
      setIsDeleting(true);
      // If the image has already been added to Firebase, remove it
      if (!tmpImages[indexToRemove].is_new) {
        await deleteImage(tmpImages[indexToRemove].url);

        // Make sure to remove the URL from the user too
        setUser((prev) => {
          if (!prev) {
            return null;
          }

          const newUser = {
            ...prev,
            imageUrls: prev.imageUrls.filter(
              (img) => img.url !== tmpImages[indexToRemove].url
            ),
          };

          return newUser;
        });
      }
      setIsDeleting(false);
      setTmpImages([
        ...tmpImages.filter((_, index) => index !== indexToRemove),
      ]);
    } catch (e) {
      if (e instanceof FirebaseError) {
        switch (e.code) {
          case "storage/object-not-found":
            setUser((prev) => {
              if (!prev) {
                return null;
              }

              const newUser = {
                ...prev,
                imageUrls: prev.imageUrls.filter(
                  (img) => img.url !== tmpImages[indexToRemove].url
                ),
              };
              setIsDeleting(false);
              setTmpImages(newUser.imageUrls);

              return newUser;
            });
        }
      } else {
        console.log("Error removing image");
      }
    }
  };

  return (
    <View key={index} style={styles.imageContainer}>
      {isDeleting ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <View>
          <Image source={{ uri: img.url }} style={styles.image} />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeImage(index)}
          >
            <Ionicons name="close-circle" size={24} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
