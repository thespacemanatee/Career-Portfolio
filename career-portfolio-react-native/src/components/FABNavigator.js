import React, { forwardRef, useState } from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import { FAB, Dialog } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as databaseActions from "../store/actions/database";

const FABNavigator = forwardRef((props, ref) => {
  const storeState = useSelector((state) => state.tasks);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const postResult = (result) => {
    setLoading(true);
    dispatch(databaseActions.postResult(result)).then(() => {
      setLoading(false);
      ref.current?.navigate("Results");
    });
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
    <View style={styles.screen}>
      <Dialog visible={loading ? true : false} dismissable={false}>
        <Dialog.Content>
          <ActivityIndicator
            animating={true}
            size="large"
            color={Colors.primary}
          />
        </Dialog.Content>
      </Dialog>

      {!loading && (
        <View style={styles.fabContainer}>
          <FAB icon="arrow-forward-outline" onPress={navigationHandler} />
        </View>
      )}
    </View>
  );
});

export default FABNavigator;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-end",
  },
  // centered: {
  //   // flex: 1,
  //   height: "20%",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  fabContainer: {
    alignItems: "flex-end",
    margin: 20,
  },
});
