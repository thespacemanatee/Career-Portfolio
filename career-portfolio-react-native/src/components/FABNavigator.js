import React, { forwardRef, Fragment, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
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
    dispatch(databaseActions.postResult(result))
      .then((res) => {
        console.log("RESPONSE: ", res);
        setLoading(false);
        ref.current?.navigate("Results");
      })
      .catch((err) => {
        console.error(err);
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
    <Fragment>
      {loading && (
        <View style={styles.screen}>
          <Dialog visible dismissable={false}>
            <Dialog.Content>
              <ActivityIndicator
                animating={true}
                size="large"
                color={Colors.primary}
              />
            </Dialog.Content>
          </Dialog>
        </View>
      )}

      {!loading && (
        <View style={styles.fabContainer}>
          <FAB icon="arrow-forward-outline" onPress={navigationHandler} />
        </View>
      )}
    </Fragment>
  );
});

export default FABNavigator;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-end",
  },
  fabContainer: {
    alignItems: "flex-end",
    margin: 20,
    position: "absolute",
    right: 0,
    top: Platform.OS === "android" ? 580 : 800,
  },
});
