import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import { RootStackParamList } from "../../types/navigations";
import styles from "./ChatsStyles";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "Chats">;

export const Chats = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleTxt}>Chats</Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.chatsWrapper}>
          <ChatPreview />
          <ChatPreview />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ChatPreview = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Pressable
      style={styles.chatWrapper}
      onPress={() => navigation.navigate("Chat")}
    >
      <ImageBackground
        source={require("../../../assets/cat.jpg")}
        style={styles.chatPic}
        resizeMode="cover"
      />
      <View style={styles.chatTxtWrapper}>
        <Text style={styles.chatName}>Jason</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chatTxt}>
          How are you?fdafdafjd;af ;kakfjdkal dkf dka;klfff
        </Text>
      </View>
    </Pressable>
  );
};
