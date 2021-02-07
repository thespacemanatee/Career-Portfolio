import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text } from "react-native";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { Title, Button } from "react-native-paper";
import { BottomSheetView, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import _ from "lodash";

import TaskTile from "../../components/TaskTile";
import * as taskActions from "../../store/actions/task";

import * as data from "../../data/career_data.json";
const dataArray = Object.values(data);

const AddByAction = (props) => {
  const storeLifeTasks = useSelector((state) => state.tasks.lifeTasks);
  const actionVerbs = useSelector((state) => state.verbs.verbs);
  const [selectedValue, setSelectedValue] = useState("Accept");
  const [resultTasks, setResultTasks] = useState([]);

  const dispatch = useDispatch();

  // const postRequest = async () => {
  //   console.log("postRequest");
  //   try {
  //     let response = await fetch("http://192.168.1.97:3001/", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(storeTasks),
  //     });
  //     let json = await response.json();
  //     return json;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const toggleLifeTaskHandler = (task) => {
    console.log("TASK CHECKED: " + task);
    dispatch(taskActions.toggleLifeTask(task));
  };

  const renderTaskTiles = useCallback(
    (itemData) => {
      // console.log(itemData.item);
      return (
        <TaskTile
          // isChecked={coreTasks.find((task) => task === itemData.item)}
          checked={() => {
            // console.log(typeof itemData.item);
            toggleLifeTaskHandler(itemData.item);
          }}
        >
          {itemData.item["Task"]}
        </TaskTile>
      );
    },
    [resultTasks]
  );

  const getNewArray = useCallback(() => {
    // console.log("useCallback");
    const tempArray = [];
    dataArray.forEach((element) => {
      const { Task } = element;
      const taskId = element["Task ID"];
      const actionVerb = (Task + "").split(/[ ,]+/, 1).toString();

      if (
        !tempArray.find((v) => _.isEqual(v["Task"], Task)) &&
        actionVerb === selectedValue &&
        !storeLifeTasks.find((u) => _.isEqual(u["Task ID"], taskId))
      ) {
        tempArray.push(element);
      }
    });
    // console.log(tempArray);
    setResultTasks(tempArray);
  }, [dataArray, selectedValue]);

  useEffect(() => {
    // console.log("useEffect");
    getNewArray();
  }, [getNewArray, selectedValue]);

  return (
    <BottomSheetView style={styles.container}>
      <BottomSheetView style={styles.title}>
        <Title>ADD BY ACTION</Title>
        <BottomSheetView style={styles.pickerContainer}>
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
              <Picker.Item key={Math.random()} label={verb} value={verb} />
            ))}
          </Picker>
        </BottomSheetView>
      </BottomSheetView>
      <BottomSheetFlatList
        data={resultTasks}
        keyExtractor={(i) => i["Task ID"].toString()}
        renderItem={renderTaskTiles}
        contentContainerStyle={styles.contentContainer}
      />
      <BottomSheetView style={styles.buttonContainer}>
        <Button onPress={props.onPress.back}>BACK</Button>
      </BottomSheetView>
    </BottomSheetView>
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
  contentContainer: {
    margin: 20,
    borderRadius: 6,
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    height: 40,
    alignItems: "flex-end",
    margin: 20,
    // backgroundColor: "red",
  },
});
