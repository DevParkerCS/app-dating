import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import * as Location from "expo-location";
import { useUser } from "../../../../context/UserContext";
import { SelectionProps } from "../../ProfileSetup";

export const LocationSelection = ({ setCurStep }: SelectionProps) => {
  const [locationPrompted, setLocationPrompted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updateLocation } = useUser();

  const requestLocation = async () => {
    try {
      setIsLoading(true);
      setLocationPrompted(true);

      // First check if we already have permissions
      let { status } = await Location.getForegroundPermissionsAsync();
      // Only request if not already granted
      if (status !== "granted") {
        const { status: newStatus } =
          await Location.requestForegroundPermissionsAsync();
        if (newStatus !== "granted") {
          alert("Permission to access location was denied");
          return;
        }
      }

      // Get location
      const location = await Location.getCurrentPositionAsync({});
      updateLocation(location.coords.latitude, location.coords.longitude);
      setCurStep((prev) => prev + 1);
      console.log("Cur Step Adjusted");
    } catch (error) {
      console.error("Error getting location:", error);
      alert("Error getting location");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Text>
        Awesome! Next We Need Your Location To Match You To People Near You!
      </Text>
      <Pressable onPress={requestLocation} disabled={isLoading}>
        <Text>{isLoading ? "Getting Location..." : "Allow Location"}</Text>
      </Pressable>
    </View>
  );
};
