import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { Title, Button } from "react-native-paper";
import _ from "lodash";

import * as data from "../../data/career_data.json";
const dataArray = Object.values(data);

const AddByAction = (props) => {
  const [selectedValue, setSelectedValue] = useState("java");
  const actionVerbs = useSelector((state) => state.verbs.verbs);
  // console.log(actionVerbs);

  const getNewArray = useCallback(() => {
    // console.log("useCallback");
    const tempArray = [];
    dataArray.forEach((element) => {
      const { Task } = element;
      const actionVerb = (Task + "").split(/[ ,]+/, 1).toString();
      if (actionVerb === selectedValue) {
        tempArray.push(element);
      }
    });
    console.log(tempArray);
  }, [dataArray, selectedValue]);

  useEffect(() => {
    // console.log("useEffect");
    const result = getNewArray();

    // for (let i = 0; i < newArray.length; i++) {
    //   console.log(newArray[i]["Title"]);
    // }
  }, [getNewArray]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title>ADD BY ACTION</Title>
        <View style={styles.pickerContainer}>
          <Text>Choose an action: </Text>
          <Picker
            itemStyle={{ height: 100 }}
            selectedValue={selectedValue}
            prompt="Choose an action"
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            {actionVerbs.map((verb) => (
              <Picker.Item label={verb} value={verb} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={props.onPress.back}>BACK</Button>
        <Button
          onPress={() => {
            props.onPress.back();
          }}
        >
          ADD
        </Button>
      </View>
    </View>
  );
};

export default AddByAction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  pickerContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    marginLeft: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    margin: 20,
    // backgroundColor: "red",
  },
});
