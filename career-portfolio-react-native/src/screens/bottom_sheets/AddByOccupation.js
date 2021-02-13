import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { Title, Button } from "react-native-paper";
import { BottomSheetView, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import _ from "lodash";

import Task from "../../models/task";
import TaskTile from "../../components/TaskTile";
import * as taskActions from "../../store/actions/task";

import * as data from "../../data/career_data.json";
import { add } from "react-native-reanimated";
const dataArray = Object.values(data);

const AddByOccupation = (props) => {
  const storeLifeTasks = useSelector((state) => state.tasks.lifeTasks);
  const occupations = useSelector((state) => state.occupations.occupations);
  const [selectedValue, setSelectedValue] = useState("Accept");
  const [resultTasks, setResultTasks] = useState([]);
  const [addedTasks, setAddedTasks] = useState([]);

  const dispatch = useDispatch();

  const toggleLifeTaskHandler = (task) => {
    console.log("TASK CHECKED: " + task);
    dispatch(taskActions.toggleLifeTask(task));

    const index = addedTasks.indexOf(task.taskId);
    const updatedAddedTask = [...addedTasks];
    if (index > -1) {
      updatedAddedTask.splice(index, 1);
    } else {
      updatedAddedTask.push(task.taskId);
    }

    setAddedTasks(updatedAddedTask);
  };

  const renderTaskTiles = useCallback(
    (itemData) => {
      // console.log(itemData.item);
      return (
        <TaskTile
          addLifeTaskMode={true}
          checkBoxEnabled={false}
          onClick={() => {
            toggleLifeTaskHandler(itemData.item);
          }}
        >
          {itemData.item.task}
        </TaskTile>
      );
    },
    [resultTasks]
  );

  const getNewArray = useCallback(() => {
    // console.log("useCallback");
    const tempArray = [];
    dataArray.forEach((element) => {
      const { Title } = element;
      const { Task } = element;
      const taskId = element["Task ID"];
      if (
        !tempArray.find((v) => _.isEqual(v["Task"], Task)) &&
        Title === selectedValue &&
        !storeLifeTasks.find((u) => _.isEqual(u.taskId, taskId))
      ) {
        tempArray.push(element);
      }
    });
    const newResult = [];
    tempArray.forEach((task) => {
      const newObject = new Task(task);
      newResult.push(newObject);
    });
    setResultTasks(newResult);
  }, [dataArray, selectedValue, addedTasks]);

  useEffect(() => {
    // console.log("useEffect");
    getNewArray();
  }, [getNewArray, selectedValue]);

  return (
    <BottomSheetView style={styles.container}>
      <BottomSheetView style={styles.title}>
        <Title>ADD BY OCCUPATION</Title>
        <BottomSheetView style={styles.pickerContainer}>
          <Text>Choose an occupation: </Text>
          <Picker
            itemStyle={{ height: 100 }}
            selectedValue={selectedValue}
            prompt="Choose an occupation"
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            {occupations.map((occupation) => (
              <Picker.Item
                key={Math.random()}
                label={occupation}
                value={occupation}
              />
            ))}
          </Picker>
        </BottomSheetView>
      </BottomSheetView>
      <BottomSheetFlatList
        data={resultTasks}
        keyExtractor={(i) => i.taskId.toString()}
        renderItem={renderTaskTiles}
        contentContainerStyle={styles.contentContainer}
      />
      <BottomSheetView style={styles.buttonContainer}>
        <Button onPress={props.onPress.back}>BACK</Button>
      </BottomSheetView>
    </BottomSheetView>
  );
};

export default AddByOccupation;

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
