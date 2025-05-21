import { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { NameSelection } from "./components/NameSelection/NameSelection";
import { AgeSelection } from "./components/AgeSelection/AgeSelection";
import { LocationSelection } from "./components/LocationSelection/LocationSelection";
import axios from "axios";
import { GenderSelection } from "./components/GenderSelection/GenderSelection";
import { ImageSelector } from "./components/ImageSelector/ImageSelector";
import { useUser } from "../../context/UserContext";
import { PromptSelection } from "./components/PromptSelection/PromptSelection";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigations";
import SelectionStyle from "./SelectionStyle";

export type SelectionProps = {
  setCurStep: React.Dispatch<React.SetStateAction<number>>;
};

export const ProfileSetup = () => {
  const [curStep, setCurStep] = useState(0);
  const { user } = useUser();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
          <ActivityIndicator size="large" />
        </View>
      )}

      {curStep == 5 && <ImageSelector setCurStep={setCurStep} />}

      {curStep == 6 && <PromptSelection setCurStep={setCurStep} />}

      {curStep > 6 && (
        <View style={SelectionStyle.container}>
          <View style={SelectionStyle.contentWrapper}>
            <Text style={SelectionStyle.subTitle}>Sweet! We're all done.</Text>
            <Text style={SelectionStyle.subTitle}>
              Please Remember To Have Fun, Be Thoughtful, And Kind.
            </Text>
            <Pressable
              style={SelectionStyle.btn}
              onPress={() =>
                navigation.navigate("MainTabs", { screen: "Explore" })
              }
            >
              <Text style={SelectionStyle.btnTxt}>Start Dating</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
