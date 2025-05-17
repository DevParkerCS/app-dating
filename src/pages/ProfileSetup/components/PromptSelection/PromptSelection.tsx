import { View, Text } from "react-native";
import { SelectionProps } from "../../ProfileSetup";
import { useState } from "react";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { PromptType, useUser } from "../../../../context/UserContext";
import axios from "axios";

export const PromptSelection = ({ setCurStep }: SelectionProps) => {
  const { user } = useUser();
  const handleFinish = async () => {
    try {
      const response = await axios.patch(
        "http://10.20.8.13:3000/users/updateProfile",
        {
          user,
        }
      );
      setCurStep((prev) => prev + 1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Text>Okay, Last Thing</Text>
      <Text>Would You Like To Add Any Prompts To Your Profile?</Text>
      {user?.prompts.map((p, i) => (
        <View key={i}>
          <Text>{p.title}</Text>
          <Text>{p.text}</Text>
        </View>
      ))}
      <Prompt />
      <Pressable onPress={handleFinish}>
        <Text>Finish Profile Setup</Text>
      </Pressable>
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
    <View>
      <TextInput
        value={title}
        onChangeText={(t) => handleChange(setTitle, t)}
        placeholder="Prompt Title"
      />
      <TextInput
        value={text}
        onChangeText={(t) => handleChange(setText, t)}
        placeholder="Prompt Text"
      />
      <Pressable onPress={handleAdd}>
        <Text>Add Prompt</Text>
      </Pressable>
    </View>
  );
};
