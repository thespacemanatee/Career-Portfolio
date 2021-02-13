import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { View, StyleSheet, FlatList, Alert, Vibration } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  BottomSheetModal,
  useBottomSheetModal,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import modalProvider from "./modalProvider";
import { Text } from "react-native-paper";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderBackButton } from "@react-navigation/stack";

import Colors from "../constants/Colors";
import DefaultScreen from "../components/ui/DefaultScreen";
import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import TaskTile from "../components/TaskTile";
import AddTask from "../screens/bottom_sheets/AddTask";
import AddByAction from "../screens/bottom_sheets/AddByAction";
import AddByOccupation from "../screens/bottom_sheets/AddByOccupation";
import * as taskActions from "../store/actions/task";

const LifeTasksScreen = ({ route, navigation }) => {
  const storeTasks = useSelector((state) => state.tasks.lifeTasks);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  // hooks
  const { dismiss, dismissAll } = useBottomSheetModal();

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
  const handleDismissAdd = useCallback(() => {
    if (bottomSheetAddRef.current) {
      bottomSheetAddRef.current.dismiss();
    }
  }, []);
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
  const renderBottomSheetContent = useCallback((type) => {
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
    } else if (type === "Action") {
      return (
        <AddByAction type={type} onPress={{ back: handleDismissAction }} />
      );
    } else if (type === "Occupation") {
      return (
        <AddByOccupation
          type={type}
          onPress={{ back: handleDismissOccupation }}
        />
      );
    } else {
      return <Text>Error</Text>;
    }
  }, []);

  const renderTaskTiles = useCallback(
    (itemData) => {
      return (
        <TaskTile
          deleteMode={deleteMode}
          checkBoxEnabled={false}
          onLongPress={() => {
            console.log("Delete Mode: " + deleteMode);
            Vibration.vibrate();
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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Onboarding",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Help"
            iconName={deleteMode ? "trash-outline" : "help-circle-outline"}
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
        backgroundColor: deleteMode ? "red" : Colors.primary,
      },
      headerTitle: deleteMode ? "Delete Tasks" : "Onboarding",
    });
  });

  return (
    <DefaultScreen title="What other tasks have you done in past jobs, or outside work?">
      {storeTasks.length === 0 && (
        <View style={styles.centered}>
          <Text>No tasks found. Start adding some!</Text>
        </View>
      )}
      <View style={styles.flatListContainer}>
        <FlatList
          data={storeTasks}
          renderItem={renderTaskTiles}
          contentContainerStyle={styles.flatList}
          keyExtractor={(item) => item.taskId.toString()}
        />
      </View>

      <BottomSheetModal
        name="Add"
        index={1}
        ref={bottomSheetAddRef}
        snapPoints={["10%", "20%"]}
        dismissOnPanDown={false}
        children={renderBottomSheetContent("Add")}
        // backdropComponent={BottomSheetBackdrop}
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
  flatListContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  flatList: {
    borderRadius: 10,
    overflow: "hidden",
  },
});

export const screenOptions = (navigationData) => {
  return {
    headerTitle: "Onboarding",
  };
};

export default modalProvider(LifeTasksScreen);
