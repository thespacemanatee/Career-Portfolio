import React, { forwardRef, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import * as databaseActions from "../store/actions/database";

const FABNavigator = forwardRef((props, ref) => {
  const storeState = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  const postResult = async (result) => {
    dispatch(databaseActions.postResult(result));
  };

  const navigationHandler = () => {
    console.log(ref.current.getCurrentRoute());
    const currentRoute = ref.current.getCurrentRoute();
    if (currentRoute.name === "Welcome") {
      ref.current?.navigate("SelectOccupation");
    }
    if (currentRoute.name === "SelectOccupation") {
      if (storeState.chosenOccupation === null) {
        Alert.alert("Error", "Please choose an occupation!", [{ text: "OK" }]);
      } else {
        ref.current?.navigate("WorkSchedule");
      }
    }
    if (currentRoute.name === "WorkSchedule") {
      ref.current?.navigate("LifeTasks");
    }
    if (currentRoute.name === "LifeTasks") {
      ref.current?.navigate("Ranking");
    }
    if (currentRoute.name === "Ranking") {
      const result = {
        // input_title: storeState.userInput,
        input_title: storeState.chosenOccupation,
        title_id: Date.now(),
        task_list: storeState.combinedTasks,
      };
      //   console.log(result);
      postResult(result);
    }
  };
  return (
    <View style={styles.fabContainer}>
      <FAB icon="arrow-forward-outline" onPress={navigationHandler} />
    </View>
  );
});

export default FABNavigator;

const styles = StyleSheet.create({
  fabContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: 20,
  },
});
