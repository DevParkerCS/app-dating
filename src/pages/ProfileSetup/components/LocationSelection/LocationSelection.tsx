import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import * as Location from "expo-location";
import { useUser } from "../../../../context/UserContext";
import { SelectionProps } from "../../ProfileSetup";
import selectionStyle from "../../SelectionStyle";

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
          alert("Please turn on location permission to continue");
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
    <View style={selectionStyle.container}>
      <View style={selectionStyle.contentWrapper}>
        <View style={selectionStyle.titleWrapper}>
          <Text style={selectionStyle.title}>Love Is In The Air!</Text>
        </View>
        <Text style={selectionStyle.subTitle}>
          Next We Need Your Location To Match You To People Near You!
        </Text>
        <Pressable
          onPress={requestLocation}
          style={selectionStyle.btn}
          disabled={isLoading}
        >
          <Text style={selectionStyle.btnTxt}>
            {isLoading ? "Getting Location..." : "Allow Location"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
