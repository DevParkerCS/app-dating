import { Pressable, TextInput, View, Text } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useUser } from "../../../../context/UserContext";
import { SelectionProps } from "../../ProfileSetup";
import selectionStyles from "../../SelectionStyle";
import ageStyles from "./AgeSelectionStyles";

export const AgeSelection = ({ setCurStep }: SelectionProps) => {
  const [show, setShow] = useState(false);
  const { updateAge, user } = useUser();

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShow(false);
    updateAge(currentDate);
  };

  return (
    <View style={selectionStyles.container}>
      <View style={selectionStyles.contentWrapper}>
        <View style={selectionStyles.titleWrapper}>
          <Text style={selectionStyles.title}>Hey, {user?.firstName}</Text>
        </View>
        <View>
          <Text style={selectionStyles.subTitle}>When Were You Born?</Text>
          <View style={ageStyles.ageInputWrapper}>
            <DateTimePicker
              testID="dateTimePicker"
              value={user?.dob || new Date()}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
              maximumDate={new Date()}
              style={ageStyles.ageInput}
            />
          </View>
        </View>
        <Pressable
          style={selectionStyles.btn}
          onPress={() => setCurStep((prev) => prev + 1)}
        >
          <Text style={selectionStyles.btnTxt}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};
