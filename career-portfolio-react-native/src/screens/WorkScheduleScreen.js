import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Text, FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import DefaultScreen from "../components/ui/DefaultScreen";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import TaskTile from "../components/TaskTile";
import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import ScreenTitle from "../components/ui/ScreenTitle";
import Colors from "../constants/Colors";
import * as taskActions from "../store/actions/task";

import * as data from "../data/career_data.json";
const dataArray = Object.values(data);

const WorkScheduleScreen = ({ route, navigation }) => {
  const storeTasks = useSelector((state) => state.tasks.tasks);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const dispatch = useDispatch();

  const toggleCoreTaskHandler = (task) => {
    console.log("TASK CHECKED: " + task);
    task.lifeTask = false;
    dispatch(taskActions.toggleCoreTask(task));
  };

  const renderTaskTiles = useCallback(
    (itemData) => {
      return (
        <TaskTile
          isChecked={storeTasks.find((task) => {
            if (task["Task ID"] === itemData.item["Task ID"]) {
              return task.coreTask;
            }
          })}
          checked={() => {
            toggleCoreTaskHandler(itemData.item);
          }}
        >
          {itemData.item["Task"]}
        </TaskTile>
      );
    },
    [storeTasks]
  );

  const getTasks = useCallback(() => {
    console.log("useCallback");
    const tempArray = dataArray.filter(
      (occupation) => occupation["Title"] === route.params.chosenOccupation
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
      result.forEach(function (task) {
        task.coreTask = false;
      });

      dispatch(taskActions.addAllTasks(result));
    } else {
      result = storeTasks;
    }
    setTasks(result);
    setIsLoading(false);
  }, [setTasks, setIsLoading, getTasks]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Help"
            iconName="help-circle-outline"
            onPress={() => {
              Alert.alert(
                "Help",
                `These are the tasks typically done by ${route.params.chosenOccupation}. Indicate if your task is a Core task, or not. Select and hold to delete tasks!`,
                [{ text: "OK" }]
              );
            }}
          />
        </HeaderButtons>
      ),
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
  } else if (tasks.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No tasks found. Start adding some!</Text>
      </View>
    );
  }

  return (
    <DefaultScreen
      title="What does your work schedule look like?"
      onPress={() => {
        navigation.push("LifeTasks");
      }}
    >
      <View style={styles.flatListContainer}>
        <FlatList
          data={tasks}
          renderItem={renderTaskTiles}
          contentContainerStyle={styles.flatList}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
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
  flatListContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  flatList: {
    borderRadius: 10,
    overflow: "hidden",
  },
  fabContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 10,
  },
});
