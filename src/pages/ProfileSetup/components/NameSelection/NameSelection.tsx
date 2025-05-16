import { Pressable, TextInput, View, Text } from "react-native";
import { useUser } from "../../../../context/UserContext";
import { SelectionProps } from "../../ProfileSetup";

export const NameSelection = ({ setCurStep }: SelectionProps) => {
  const { updateFirstName, updateLastName, user } = useUser();

  return (
    <View>
      <View>
        <Text>Welcome</Text>
      </View>
      <View>
        <Text>Let's Start With Your Name!</Text>
        <TextInput
          placeholder="First Name"
          value={user?.firstName}
          onChangeText={(text) => updateFirstName(text)}
        ></TextInput>
        <TextInput
          placeholder="Last Name"
          value={user?.lastName}
          onChangeText={(text) => updateLastName(text)}
        ></TextInput>
      </View>
      <Pressable onPress={() => setCurStep((prev) => prev + 1)}>
        <Text>Next</Text>
      </Pressable>
    </View>
  );
};
