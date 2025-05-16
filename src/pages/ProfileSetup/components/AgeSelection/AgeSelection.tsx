import { Pressable, TextInput, View, Text } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useUser } from "../../../../context/UserContext";
import { SelectionProps } from "../../ProfileSetup";

export const AgeSelection = ({ setCurStep }: SelectionProps) => {
  const [show, setShow] = useState(false);
  const { updateAge, user } = useUser();

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShow(false);
    updateAge(currentDate);
  };

  return (
    <View>
      <View>
        <Text>Hey, {user?.firstName}</Text>
      </View>
      <View>
        <Text>Next, When Were You Born?</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={user?.dob || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      </View>
      <Pressable onPress={() => setCurStep((prev) => prev + 1)}>
        <Text>Next</Text>
      </Pressable>
    </View>
  );
};
