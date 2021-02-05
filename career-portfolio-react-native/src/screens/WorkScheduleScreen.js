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

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import TaskTile from "../components/TaskTile";
import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import ScreenTitle from "../components/ui/ScreenTitle";
import Colors from "../constants/Colors";
import { toggleCoreTask } from "../store/actions/task";

import * as data from "../data/career_data.json";
const dataArray = Object.values(data);

const WorkScheduleScreen = ({ route, navigation }) => {
  const coreTasks = useSelector((state) => state.tasks.coreTasks);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const dispatch = useDispatch();

  const toggleCoreTaskHandler = (task) => {
    console.log("TASK CHECKED: " + task);
    dispatch(toggleCoreTask(task));
  };

  const renderTaskTiles = useCallback(
    (itemData) => {
      // console.log(itemData.item);
      return (
        <TaskTile
          isChecked={coreTasks.find((task) => task === itemData.item)}
          checked={() => {
            // console.log(typeof itemData.item);
            toggleCoreTaskHandler(itemData.item);
          }}
        >
          {itemData.item["Task"]}
        </TaskTile>
      );
    },
    [tasks]
  );

  const getNewArray = useCallback(() => {
    // console.log("useCallback");
    const tempArray = dataArray.filter(
      (occupation) => occupation["Title"] === route.params.chosenOccupation
    );

    return tempArray.filter((item) => {
      if (!this[item["Task"]]) {
        this[item["Task"]] = true;
        return true;
      }
      return false;
    }, Object.create(null));
  }, [dataArray]);

  useEffect(() => {
    // console.log("useEffect");
    const result = getNewArray();

    // for (let i = 0; i < newArray.length; i++) {
    //   console.log(newArray[i]["Title"]);
    // }

    setTasks(result);
    setIsLoading(false);
  }, [setTasks, setIsLoading, getNewArray]);

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
    <View style={styles.screen}>
      <ScreenTitle>What does your work schedule look like?</ScreenTitle>

      <View style={styles.flatListContainer}>
        <FlatList
          data={tasks}
          renderItem={renderTaskTiles}
          contentContainerStyle={styles.flatList}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.fabContainer}>
        <FAB
          icon="arrow-forward-outline"
          onPress={() => {
            console.log(coreTasks);
            navigation.push("LifeTasks");
          }}
        />
      </View>
    </View>
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
