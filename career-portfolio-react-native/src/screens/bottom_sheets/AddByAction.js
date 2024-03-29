import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { Title, Button } from "react-native-paper";
import { BottomSheetView, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import _ from "lodash";

import TaskModel from "../../models/task";
import TaskTile from "../../components/TaskTile";
import * as taskActions from "../../store/actions/task";

import * as data from "../../data/career_data.json";

const dataArray = Object.values(data);

const AddByAction = (props) => {
  const storeLifeTasks = useSelector((state) => state.tasks.lifeTasks);
  const actionVerbs = useSelector((state) => state.verbs.verbs);
  const [selectedValue, setSelectedValue] = useState("Accept");
  const [resultTasks, setResultTasks] = useState([]);
  const [addedTasks, setAddedTasks] = useState([]);
  const { onPress } = props;

  const dispatch = useDispatch();

  const toggleLifeTaskHandler = useCallback(
    (task) => {
      console.log(`TASK CHECKED: ${task}`);
      dispatch(taskActions.toggleLifeTask(task));

      const index = addedTasks.indexOf(task.taskId);
      const updatedAddedTask = [...addedTasks];
      if (index > -1) {
        updatedAddedTask.splice(index, 1);
      } else {
        updatedAddedTask.push(task.taskId);
      }

      setAddedTasks(updatedAddedTask);
    },
    [addedTasks, dispatch]
  );

  const renderTaskTiles = useCallback(
    (itemData) => {
      // console.log(itemData.item);
      return (
        <TaskTile
          addLifeTaskMode
          checkBoxEnabled={false}
          onClick={() => {
            toggleLifeTaskHandler(itemData.item);
          }}
        >
          {itemData.item.task}
        </TaskTile>
      );
    },
    [toggleLifeTaskHandler]
  );

  const getNewArray = useCallback(() => {
    // console.log("useCallback");
    const tempArray = [];
    dataArray.forEach((element) => {
      const { Task } = element;
      const taskId = element["Task ID"];
      let actionVerb = `${Task}`.split(/[ ,]+/);
      actionVerb = actionVerb.map((verb) => verb.toLowerCase());

      if (
        !tempArray.find((v) => _.isEqual(v.Task, Task)) &&
        actionVerb.includes(selectedValue.toLowerCase()) &&
        !storeLifeTasks.find((u) => _.isEqual(u.taskId, taskId))
      ) {
        tempArray.push(element);
      }
    });
    const newResult = [];
    tempArray.forEach((task) => {
      const newObject = new TaskModel(task);
      newResult.push(newObject);
      // console.log(newObject);
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
        keyExtractor={(i) => i.taskId.toString()}
        renderItem={renderTaskTiles}
        contentContainerStyle={styles.contentContainer}
      />
      <BottomSheetView style={styles.buttonContainer}>
        <Button onPress={onPress.back}>BACK</Button>
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
    marginLeft: 20,
    marginRight: 20,
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
