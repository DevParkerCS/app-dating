import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./ChatStyles";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Message } from "./components/Message";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigations";
import { sendMessage, joinRoom, socket } from "../../utils/socket";

type MessageType = {
  sent: boolean;
  text: string;
};

export const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const roomNum = Math.floor(Math.random() * 2);

  const handleSubmit = () => {
    if (input.trim() === "") return;

    sendMessage(input);

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sent: true },
    ]);
    setInput("");
  };

  useEffect(() => {
    joinRoom(roomNum);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, { text: data, sent: false }]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.chatInfoWrapper}>
          <FontAwesome
            style={[styles.chatInfoIcon, styles.goBack]}
            onPress={() => navigation.navigate("MainTabs", { screen: "Chats" })}
            name="arrow-left"
          />
          <View style={styles.chatInfo}>
            <ImageBackground
              source={require("../../../assets/cat.jpg")}
              style={styles.chatPic}
              resizeMode="cover"
            />
            <Text style={styles.chatName}>Jason</Text>
          </View>
          <FontAwesome style={styles.chatInfoIcon} name="sliders" />
        </View>

        <ScrollView style={styles.messagesWrapper}>
          {messages.map((msg, i) => (
            <Message key={i} text={msg.text} sent={msg.sent} />
          ))}
        </ScrollView>
        <TextInput
          style={styles.txtBar}
          placeholder={"Type Message..."}
          onSubmitEditing={handleSubmit}
          value={input}
          onChangeText={setInput}
          placeholderTextColor={"white"}
          blurOnSubmit={false}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
