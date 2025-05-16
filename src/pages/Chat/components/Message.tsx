import { View, Text } from "react-native";
import styles from "./MessageStyles";

type MessageProps = {
  text: string;
  sent: boolean;
};

export const Message = ({ text, sent }: MessageProps) => {
  return (
    <View style={styles.msgWrapper}>
      <View style={[styles.msg, sent ? styles.sentMsg : styles.recvMsg]}>
        <Text style={styles.msgTxt}>{text}</Text>
      </View>
    </View>
  );
};
