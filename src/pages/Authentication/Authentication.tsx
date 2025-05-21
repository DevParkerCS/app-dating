import { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Pressable } from "react-native";
import { Login } from "./components/Login/Login";
import { SignUp } from "./components/Signup/Signup";
import styles from "./AuthenticationStyles";
import { useUser } from "../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigations";

export const Authentication = () => {
  const [isLoggingIn, setIsLogginIn] = useState(true);
  const { user } = useUser();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (user !== null) {
      if (!user.is_profile_complete) {
        navigation.navigate("ProfileSetup");
      } else {
        navigation.navigate("MainTabs", { screen: "Explore" });
      }
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SoulMatch</Text>
      <View>{isLoggingIn ? <Login /> : <SignUp />}</View>
      <Pressable onPress={() => setIsLogginIn(!isLoggingIn)}>
        <Text style={styles.loginTxt}>
          {isLoggingIn
            ? "New Here? Click To Sign Up"
            : "Already Have An Account? Click To Log In"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};
