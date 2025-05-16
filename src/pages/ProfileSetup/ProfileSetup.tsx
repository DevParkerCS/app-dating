import { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { NameSelection } from "./components/NameSelection/NameSelection";
import { AgeSelection } from "./components/AgeSelection/AgeSelection";
import { LocationSelection } from "./components/LocationSelection/LocationSelection";
import * as Location from "expo-location";
import axios from "axios";
import { GenderSelection } from "./components/GenderSelection/GenderSelection";
import { ImageSelector } from "./components/ImageSelector/ImageSelector";
import { useUser } from "../../context/UserContext";

export type SelectionProps = {
  setCurStep: React.Dispatch<React.SetStateAction<number>>;
};

export const ProfileSetup = () => {
  const [curStep, setCurStep] = useState(0);
  const { user } = useUser();

  const updateUser = async () => {
    const response = await axios.patch(
      "http://10.20.8.13:3000/users/updateProfile",
      {
        user,
      }
    );
    setCurStep(curStep + 1);
    return null;
  };

  useEffect(() => {
    if (curStep === 4) {
      updateUser();
    }
  }, [curStep]);

  return (
    <SafeAreaView>
      {curStep == 0 && <NameSelection setCurStep={setCurStep} />}

      {curStep == 1 && <AgeSelection setCurStep={setCurStep} />}

      {curStep == 2 && <GenderSelection setCurStep={setCurStep} />}

      {curStep == 3 && <LocationSelection setCurStep={setCurStep} />}

      {curStep == 4 && (
        <View>
          <Text>Thanks! Updating Your Information...</Text>
        </View>
      )}

      {curStep == 5 && <ImageSelector setCurStep={setCurStep} />}
    </SafeAreaView>
  );
};
