import React, { useEffect } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SelectionProps } from "../../ProfileSetup";
import { useUser } from "../../../../context/UserContext";

export const GenderSelection = ({ setCurStep }: SelectionProps) => {
  const { user, updateGender } = useUser();

  const genderOptions = [
    { label: "Select gender", value: "" },
    { label: "Woman", value: "woman" },
    { label: "Man", value: "man" },
    { label: "Non-binary", value: "non-binary" },
    { label: "Transgender", value: "transgender" },
    { label: "Gender fluid", value: "gender-fluid" },
    { label: "Gender queer", value: "gender-queer" },
    { label: "Prefer not to say", value: "not-specified" },
    { label: "Other", value: "other" },
  ];

  const handleChange = (gender: string) => {
    updateGender(gender);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={user?.gender}
        onValueChange={handleChange}
        style={styles.picker}
      >
        {genderOptions.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
      <Pressable onPress={() => setCurStep((prev) => prev + 1)}>
        <Text>Next</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 5,
  },
  picker: {
    width: "100%",
  },
});
