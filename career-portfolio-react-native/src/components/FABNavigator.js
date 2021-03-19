import React, { forwardRef, Fragment, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { FAB, Dialog, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as databaseActions from "../store/actions/database";

const FABNavigator = forwardRef((props, ref) => {
  const storeState = useSelector((state) => state.tasks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const handleErrorDialog = () => {
    setError(false);
  };

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
        setLoading(false);
        setError(true);
      });
  };

  const navigationHandler = () => {
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
    <>
      {(loading || error) && (
        <View style={styles.screen}>
          <Dialog visible dismissable={false}>
            <Dialog.Content>
              {loading && (
                <ActivityIndicator
                  animating
                  size="large"
                  color={Colors.primary}
                />
              )}
              {error && <Text>An error has occurred. Please try again!</Text>}
            </Dialog.Content>
            {error && (
              <Dialog.Actions>
                <Button onPress={handleErrorDialog}>Okay</Button>
              </Dialog.Actions>
            )}
          </Dialog>
        </View>
      )}

      {!loading && (
        <View style={styles.fabContainer}>
          <FAB icon="arrow-forward-outline" onPress={navigationHandler} />
        </View>
      )}
    </>
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
    bottom: 0,
  },
});
