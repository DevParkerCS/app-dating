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
import { useUser } from "../../context/UserContext";

export const Explore = () => {
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.homeWrapper}>
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>Jason, 27</Text>
        </View>
        <View style={styles.profileImgWrapper}>
          <ImageBackground
            source={{ uri: user?.imageUrls[3].url }}
            style={styles.profileImg}
            resizeMode="cover"
          />
        </View>
        <View style={styles.promptWrapper}>
          <Text style={styles.promptHeader}>I'm weirdly attracted to</Text>
          <Text style={styles.promptTxt}>
            People who aren't on social media.
          </Text>
        </View>
        <View style={styles.profileImgWrapper}>
          <ImageBackground
            source={{ uri: user?.imageUrls[1].url }}
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
