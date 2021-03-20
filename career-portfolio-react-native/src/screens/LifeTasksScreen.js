/* eslint-disable react/no-children-prop */
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { View, StyleSheet, Alert, Vibration, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Text } from "react-native-paper";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderBackButton } from "@react-navigation/stack";
import modalProvider from "./modalProvider";

import Colors from "../constants/Colors";
import DefaultScreen from "../components/ui/DefaultScreen";
import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import CustomFlatList from "../components/ui/CustomFlatList";
import TaskTile from "../components/TaskTile";
import AddTask from "./bottom_sheets/AddTask";
import AddByAction from "./bottom_sheets/AddByAction";
import AddByOccupation from "./bottom_sheets/AddByOccupation";
import * as taskActions from "../store/actions/task";

const LifeTasksScreen = ({ navigation }) => {
  const storeTasks = useSelector((state) => state.tasks.lifeTasks);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  // hooks
  // const { dismiss, dismissAll } = useBottomSheetModal();

  // refs
  const bottomSheetAddRef = useRef(null);
  const bottomSheetActionRef = useRef(null);
  const bottomSheetOccupationRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["20%", "70%"], []);

  // callbacks
  const handlePresentAdd = useCallback(() => {
    if (bottomSheetAddRef.current) {
      bottomSheetAddRef.current.present();
    }
  }, []);
  // const handleDismissAdd = useCallback(() => {
  //   if (bottomSheetAddRef.current) {
  //     bottomSheetAddRef.current.dismiss();
  //   }
  // }, []);
  const handlePresentAction = useCallback(() => {
    if (bottomSheetActionRef.current) {
      bottomSheetActionRef.current.present();
    }
  }, []);
  const handleDismissAction = useCallback(() => {
    if (bottomSheetActionRef.current) {
      bottomSheetActionRef.current.dismiss();
    }
  }, []);
  const handlePresentOccupation = useCallback(() => {
    if (bottomSheetOccupationRef.current) {
      bottomSheetOccupationRef.current.present();
    }
  }, []);
  const handleDismissOccupation = useCallback(() => {
    if (bottomSheetOccupationRef.current) {
      bottomSheetOccupationRef.current.dismiss();
    }
  }, []);

  useEffect(() => {
    handlePresentAdd();
  }, [handlePresentAdd]);

  const dispatch = useDispatch();

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

  // renders
  const renderBottomSheetContent = useCallback(
    (type) => {
      if (type === "Add") {
        return (
          <AddTask
            type={type}
            onPress={{
              action: handlePresentAction,
              occupation: handlePresentOccupation,
            }}
          />
        );
      }
      if (type === "Action") {
        return (
          <AddByAction type={type} onPress={{ back: handleDismissAction }} />
        );
      }
      if (type === "Occupation") {
        return (
          <AddByOccupation
            type={type}
            onPress={{ back: handleDismissOccupation }}
          />
        );
      }
      return <Text>Error</Text>;
    },
    [
      handleDismissAction,
      handleDismissOccupation,
      handlePresentAction,
      handlePresentOccupation,
    ]
  );

  const renderTaskTiles = useCallback(
    (itemData) => {
      return (
        <TaskTile
          deleteMode={deleteMode}
          checkBoxEnabled={false}
          onLongPress={() => {
            console.log(`Delete Mode: ${deleteMode}`);
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
    [deleteMode, toggleDeleteHandler]
  );

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
                  : "Select tasks that you have done in past jobs or outside work!",

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
                          dispatch(taskActions.deleteLifeTasks(deleteList));
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
        // eslint-disable-next-line no-nested-ternary
        backgroundColor: deleteMode
          ? "red"
          : Platform.OS === "android"
          ? Colors.primary
          : undefined,
      },
      headerTitle: deleteMode ? "Delete Tasks" : "Onboarding",
      // eslint-disable-next-line no-nested-ternary
      headerTintColor: deleteMode
        ? "white"
        : Platform.OS === "android"
        ? "white"
        : Colors.primary,
    });
  });

  return (
    <DefaultScreen
      title="What other tasks have you done in past jobs, or outside work?"
      onPressFAB={() => {
        navigation.push("Ranking");
      }}
    >
      {storeTasks.length === 0 && (
        <View style={styles.centered}>
          <Text>No tasks found. Start adding some!</Text>
        </View>
      )}

      <CustomFlatList
        data={storeTasks}
        renderItem={renderTaskTiles}
        keyExtractor={(item) => item.taskId.toString()}
      />

      <BottomSheetModal
        name="Add"
        index={1}
        ref={bottomSheetAddRef}
        snapPoints={["10%", "20%"]}
        dismissOnPanDown={false}
        children={renderBottomSheetContent("Add")}
      />

      <BottomSheetModal
        name="Action"
        index={1}
        ref={bottomSheetActionRef}
        snapPoints={snapPoints}
        dismissOnPanDown={false}
        children={renderBottomSheetContent("Action")}
        backdropComponent={BottomSheetBackdrop}
      />

      <BottomSheetModal
        name="Occupation"
        ref={bottomSheetOccupationRef}
        index={1}
        snapPoints={snapPoints}
        dismissOnPanDown={false}
        children={renderBottomSheetContent("Occupation")}
        backdropComponent={BottomSheetBackdrop}
      />
    </DefaultScreen>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default modalProvider(LifeTasksScreen);
