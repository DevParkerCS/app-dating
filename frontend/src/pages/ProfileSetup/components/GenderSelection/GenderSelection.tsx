import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SelectionProps } from "../../ProfileSetup";
import { useUser } from "../../../../context/UserContext";
import selectionStyle from "../../SelectionStyle";

export const GenderSelection = ({ setCurStep }: SelectionProps) => {
  const { user, setUser, updateGender } = useUser();
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

  const handleSubmit = () => {
    setUser((prev) => {
      if (prev == null) {
        return null;
      }

      return {
        ...prev,
        interestedIn: {
          ...prev.interestedIn,
          genders: selectedItems,
        },
      };
    });

    setCurStep((prev) => prev + 1);
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
            <Picker
              selectedValue={user?.gender || undefined}
              onValueChange={handleChange}
            >
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
              options={genderOptions}
              selectedValues={selectedItems}
              onSelect={setSelectedItems}
            />
            <Pressable style={selectionStyle.btn} onPress={handleSubmit}>
              <Text style={selectionStyle.btnTxt}>Select</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

type MultiSelectProps = {
  options: {
    label: string;
    value: string;
  }[];
  selectedValues: string[];
  onSelect: React.Dispatch<React.SetStateAction<string[]>>;
};

const MultiSelect = ({
  options,
  selectedValues,
  onSelect,
}: MultiSelectProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSelection = (value: string) => {
    if (selectedValues.includes(value)) {
      onSelect(selectedValues.filter((item) => item !== value));
    } else {
      onSelect([...selectedValues, value]);
    }
  };

  return (
    <View>
      <View style={styles.modalContainer}>
        <FlatList
          data={options}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => toggleSelection(item.value)}
            >
              <Text
                style={{
                  color: selectedValues.includes(item.value)
                    ? "green"
                    : "black",
                  fontSize: 16,
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  doneButton: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#ddd",
    marginTop: 20,
  },
});
