import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SelectionProps } from "../../ProfileSetup";
import { useUser } from "../../../../context/UserContext";
import selectionStyle from "../../SelectionStyle";
import MultiSelect from "react-native-multiple-select";

export const GenderSelection = ({ setCurStep }: SelectionProps) => {
  const { user, updateGender } = useUser();
  const [isChoosingGender, setIsChoosingGender] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const genderOptions = [
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
    <View style={selectionStyle.container}>
      <View style={selectionStyle.contentWrapper}>
        {isChoosingGender ? (
          <View>
            <View>
              <Text style={selectionStyle.subTitle}>
                Next What Is Your Gender?
              </Text>
            </View>
            <Picker selectedValue={user?.gender} onValueChange={handleChange}>
              {genderOptions.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
            <Pressable
              style={selectionStyle.btn}
              onPress={() => setIsChoosingGender(false)}
            >
              <Text style={selectionStyle.btnTxt}>Select</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <View>
              <Text style={selectionStyle.subTitle}>
                Great And What Gender(s) Are You Looking For?
              </Text>
            </View>
            <MultiSelect
              items={genderOptions}
              uniqueKey="label"
              onSelectedItemsChange={(e) => setSelectedItems(e)}
              selectedItems={selectedItems}
              selectText="Choose Genders"
              searchInputPlaceholderText="Search Genders..."
              tagRemoveIconColor="lightblue"
              tagBorderColor="lightblue"
              tagTextColor="#000"
              selectedItemTextColor="#000"
              selectedItemIconColor="#000"
              itemTextColor="#000"
              itemFontSize={18}
              displayKey="value"
              searchInputStyle={{ color: "#CCC" }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
            <Pressable
              style={selectionStyle.btn}
              onPress={() => setCurStep((prev) => prev + 1)}
            >
              <Text style={selectionStyle.btnTxt}>Select</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};
