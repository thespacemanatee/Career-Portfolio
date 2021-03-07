import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  Vibration,
  Platform,
} from "react-native";
import { Text } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { HeaderBackButton } from "@react-navigation/stack";

import Task from "../models/task";
import DefaultScreen from "../components/ui/DefaultScreen";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import TaskTile from "../components/TaskTile";
import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import CustomFlatList from "../components/ui/CustomFlatList";
import Colors from "../constants/Colors";
import * as taskActions from "../store/actions/task";

import * as data from "../data/career_data.json";
const dataArray = Object.values(data);

const WorkScheduleScreen = ({ route, navigation }) => {
  const storeTasks = useSelector((state) => state.tasks.tasks);
  const chosenOccupation = useSelector((state) => state.tasks.chosenOccupation);
  // const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  const [error, setError] = useState(undefined);

  const dispatch = useDispatch();

  const toggleCoreTaskHandler = (task) => {
    console.log("TASK CHECKED: " + task);
    dispatch(taskActions.toggleCoreTask(task));
  };

  const toggleDeleteHandler = useCallback(
    (taskId) => {
      const index = deleteList.indexOf(taskId);
      const updatedDeleteList = [...deleteList];
      if (index > -1) {
        updatedDeleteList.splice(index, 1);
      } else {
        updatedDeleteList.push(taskId);
      }

      setDeleteList(updatedDeleteList);
      console.log(deleteList);
    },
    [deleteList]
  );

  useEffect(() => {
    if (!deleteMode) {
      setDeleteList([]);
    }
  }, [deleteMode, setDeleteList]);

  const renderTaskTiles = useCallback(
    (itemData) => {
      return (
        <TaskTile
          deleteMode={deleteMode}
          checkBoxEnabled={!deleteMode}
          isChecked={storeTasks.find((task) => {
            if (task.taskId === itemData.item.taskId) {
              if (task.task_type === "core") {
                return true;
              }
              return false;
            }
          })}
          checked={() => {
            toggleCoreTaskHandler(itemData.item);
          }}
          onLongPress={() => {
            console.log("Delete Mode: " + deleteMode);
            Vibration.vibrate(50);
            setDeleteMode(!deleteMode);
            toggleDeleteHandler(itemData.item.taskId);
          }}
          onClick={() => {
            console.log("I have been clicked!");
            toggleDeleteHandler(itemData.item.taskId);
          }}
        >
          {itemData.item.task}
        </TaskTile>
      );
    },
    [storeTasks, deleteMode, deleteList]
  );

  const getTasks = useCallback(() => {
    console.log("useCallback");
    const tempArray = dataArray.filter(
      (occupation) => occupation["Title"] === chosenOccupation
    );

    return tempArray.filter(function (item) {
      if (!this[item["Task"]]) {
        this[item["Task"]] = true;
        return true;
      }
      return false;
    }, Object.create(null));
  }, [dataArray]);

  useEffect(() => {
    console.log("useEffect");
    let result;

    if (!storeTasks.length) {
      result = getTasks();
      let newResult = [];
      result.forEach((task) => {
        const newObject = new Task(task);
        newResult.push(newObject);
      });
      // console.log(newResult);
      // setTasks(newResult);
      dispatch(taskActions.addAllTasks(newResult));
    } else {
      // result = storeTasks;
      // setTasks(result);
    }
    setIsLoading(false);
  }, [setIsLoading, getTasks]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Help"
            iconName={deleteMode ? "trash-outline" : "help-circle-outline"}
            buttonStyle={{ color: "white" }}
            onPress={() => {
              Alert.alert(
                deleteMode ? "Delete" : "Help",
                deleteMode
                  ? "Are you sure you want to delete these tasks?"
                  : `These are the tasks typically done by ${chosenOccupation}. Indicate if your task is a Core task, or not. Select and hold to delete tasks!`,

                deleteMode
                  ? [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel"),
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        onPress: () => {
                          console.log("Delete");
                          dispatch(taskActions.deleteTasks(deleteList));
                          setDeleteMode(false);
                        },
                      },
                    ]
                  : [{ text: "OK" }]
              );
            }}
          />
        </HeaderButtons>
      ),
      headerLeft: deleteMode
        ? () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                iconName="close-outline"
                buttonStyle={{ color: "white" }}
                onPress={() => {
                  setDeleteMode(!deleteMode);
                }}
              />
            </HeaderButtons>
          )
        : () => (
            <HeaderBackButton
              tintColor={Platform.OS === "android" ? "white" : Colors.primary}
              onPress={() => {
                navigation.pop();
              }}
            />
          ),
      headerStyle: {
        backgroundColor: deleteMode
          ? "red"
          : Platform.OS === "android"
          ? Colors.primary
          : undefined,
      },
      headerTitle: deleteMode ? "Delete Tasks" : "Onboarding",
      headerTintColor: deleteMode
        ? "white"
        : Platform.OS === "android"
        ? "white"
        : Colors.primary,
    });
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          animating={true}
          size="large"
          color={Colors.primary}
        />
      </View>
    );
  } else if (storeTasks.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No tasks found. Start adding some!</Text>
      </View>
    );
  }

  return (
    <DefaultScreen
      title="What does your work schedule look like?"
      onPressFAB={() => {
        navigation.push("LifeTasks");
      }}
    >
      <CustomFlatList
        data={storeTasks}
        renderItem={renderTaskTiles}
        keyExtractor={(item, index) => index.toString()}
      />
    </DefaultScreen>
  );
};

export const screenOptions = (navigationData) => {
  return {
    headerTitle: "Onboarding",
  };
};

export default WorkScheduleScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    margin: 30,
  },
});
