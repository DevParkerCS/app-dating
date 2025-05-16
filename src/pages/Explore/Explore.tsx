import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./ExploreStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigations";

type Props = NativeStackScreenProps<RootStackParamList, "Explore">;

export const Explore = ({ navigation, route }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.homeWrapper}>
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>Jason, 27</Text>
        </View>
        <View style={styles.profileImgWrapper}>
          <ImageBackground
            source={require("../../../assets/cat.jpg")}
            style={styles.profileImg}
            resizeMode="cover"
          />
        </View>
        <View style={styles.profileTxt}>
          <Text style={styles.promptHeader}>I'm weirdly attracted to</Text>
          <Text style={styles.promptTxt}>
            People who aren't on social media.
          </Text>
        </View>
        <View style={styles.profileImgWrapper}>
          <ImageBackground
            source={require("../../../assets/cat.jpg")}
            style={styles.profileImg}
          />
        </View>
        <StatusBar style="auto" />
      </ScrollView>
      <View style={styles.buttonOptions}>
        <View style={[styles.iconWrapper]}>
          <FontAwesome name="close" style={styles.iconOption} />
        </View>
        <View style={[styles.iconWrapper]}>
          <FontAwesome name="heart" style={styles.iconOption} />
        </View>
      </View>
    </SafeAreaView>
  );
};
