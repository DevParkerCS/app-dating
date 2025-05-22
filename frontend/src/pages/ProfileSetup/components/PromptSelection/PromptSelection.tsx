import { View, Text, ScrollView } from "react-native";
import { SelectionProps } from "../../ProfileSetup";
import { useState } from "react";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useUser } from "../../../../context/UserContext";
import axios from "axios";
import styles from "./PromptSelectionStyles";
import selectionStyle from "../../SelectionStyle";

export const PromptSelection = ({ setCurStep }: SelectionProps) => {
  const { user } = useUser();
  const handleFinish = async () => {
    const finishedUser = user;
    if (finishedUser) {
      finishedUser.is_profile_complete = true;
      try {
        const response = await axios.patch(
          "http://10.20.8.13:3000/users/updateProfile",
          {
            user: finishedUser,
          }
        );
        setCurStep((prev) => prev + 1);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={selectionStyle.container}>
      <View style={selectionStyle.contentWrapper}>
        <View style={selectionStyle.titleWrapper}>
          <Text style={selectionStyle.title}>Okay, Last Thing</Text>
        </View>
        <Text style={selectionStyle.subTitle}>
          Would You Like To Add Any Prompts To Your Profile?
        </Text>
        <ScrollView style={styles.promptsWrapper}>
          {user?.prompts.length == 0 ? (
            <View style={styles.promptWrapper}>
              <Text style={styles.promptHeader}>Example Title</Text>
              <Text style={styles.promptTxt}>Example Message</Text>
            </View>
          ) : (
            user?.prompts.map((p, i) => (
              <View style={styles.promptWrapper} key={i}>
                <Text style={styles.promptHeader}>{p.title}</Text>
                <Text style={styles.promptTxt}>{p.text}</Text>
              </View>
            ))
          )}
        </ScrollView>
        <Prompt />
        <Pressable style={selectionStyle.btn} onPress={handleFinish}>
          <Text style={selectionStyle.btnTxt}>Finish Profile Setup</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Prompt = () => {
  const { setUser } = useUser();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [titleError, setTitleError] = useState("");
  const [textError, setTextError] = useState("");

  const handleChange = (
    cb: React.Dispatch<React.SetStateAction<string>>,
    text: string
  ) => {
    setTitleError("");
    setTextError("");
    cb(text);
  };

  const handleAdd = () => {
    if (title.trim() === "") {
      setTitleError("Title Can't Be Empty");
      return;
    } else if (text.trim() === "") {
      setTextError("Text Can't Be Empty");
      return;
    }

    setUser((prevState) => {
      if (prevState == null) {
        return prevState;
      }
      return {
        ...prevState,
        prompts: [...prevState.prompts, { title, text }],
      };
    });
    setTitle("");
    setText("");
  };

  return (
    <View style={selectionStyle.inputsWrapper}>
      <TextInput
        style={selectionStyle.txtInput}
        value={title}
        onChangeText={(t) => handleChange(setTitle, t)}
        placeholder="Prompt Title"
      />
      <TextInput
        style={selectionStyle.txtInput}
        value={text}
        onChangeText={(t) => handleChange(setText, t)}
        placeholder="Prompt Text"
      />
      <Pressable style={selectionStyle.btn} onPress={handleAdd}>
        <Text style={selectionStyle.btnTxt}>Add Prompt</Text>
      </Pressable>
    </View>
  );
};
