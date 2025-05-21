import { Pressable, TextInput, View, Text } from "react-native";
import { useUser } from "../../../../context/UserContext";
import { SelectionProps } from "../../ProfileSetup";
import selectionStyle from "../../SelectionStyle";

export const NameSelection = ({ setCurStep }: SelectionProps) => {
  const { updateFirstName, updateLastName, user } = useUser();

  return (
    <View style={selectionStyle.container}>
      <View style={selectionStyle.contentWrapper}>
        <View style={selectionStyle.titleWrapper}>
          <Text style={selectionStyle.title}>Welcome</Text>
        </View>
        <View>
          <Text style={selectionStyle.subTitle}>
            Let's Start With Your Name!
          </Text>
          <View style={selectionStyle.inputsWrapper}>
            <TextInput
              placeholder="First Name"
              value={user?.firstName}
              onChangeText={(text) => updateFirstName(text)}
              style={selectionStyle.txtInput}
            ></TextInput>
            <TextInput
              placeholder="Last Name"
              value={user?.lastName}
              onChangeText={(text) => updateLastName(text)}
              style={selectionStyle.txtInput}
            ></TextInput>
          </View>
        </View>
        <Pressable
          style={selectionStyle.btn}
          onPress={() => setCurStep((prev) => prev + 1)}
        >
          <Text style={selectionStyle.btnTxt}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};
