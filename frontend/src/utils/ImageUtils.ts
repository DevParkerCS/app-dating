import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getStorage,
  listAll,
} from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { storage } from "../firebase/config";

export const uploadImage = async (uri: string, userId: number) => {
  try {
    // Convert URI to blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Create filename
    const filename = `users/${userId}/${Date.now()}.jpg`;

    // Create storage reference
    const storageRef = ref(storage, filename);

    // Upload
    const snapshot = await uploadBytes(storageRef, blob);

    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const deleteImage = async (path: string) => {
  try {
    const fileref = ref(storage, path);

    await deleteObject(fileref);
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log("Error deleting image:", error.code);
      throw error;
    }
  }
};

export const getImages = async (userId: number) => {
  try {
    const folderRef = ref(storage, `users/${userId}`);
    const result = await listAll(folderRef);

    const urls = await Promise.all(
      result.items.map((itemRef) => getDownloadURL(itemRef))
    );

    return urls;
  } catch (e) {
    console.log("Error getting images", e);
    throw e;
  }
};
