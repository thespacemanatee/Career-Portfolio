import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  BottomSheetModal,
  useBottomSheetModal,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import modalProvider from "./modalProvider";
import { Text } from "react-native-paper";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import DefaultScreen from "../components/ui/DefaultScreen";
import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import TaskTile from "../components/TaskTile";
import ScreenTitle from "../components/ui/ScreenTitle";
import AddTask from "../screens/bottom_sheets/AddTask";
import AddByAction from "../screens/bottom_sheets/AddByAction";
import AddByOccupation from "../screens/bottom_sheets/AddByOccupation";

const LifeTasksScreen = (props) => {
  const storeTasks = useSelector((state) => state.tasks.lifeTasks);
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
  const handleDismissAllPress = useCallback(() => {
    dismissAll();
  }, [dismissAll]);
  const handleDismissByHookPress = useCallback(() => {
    dismiss("A");
  }, [dismiss]);

  useEffect(() => {
    handlePresentAdd();
  }, [handlePresentAdd]);

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
    },

    //   <ContactListContainer
    //     title={title}
    //     type="FlatList"
    //     onItemPress={onPress}
    //   />
    []
  );

  const renderTaskTiles = useCallback(
    (itemData) => {
      return (
        <TaskTile
          // isChecked={storeTasks.find((task) => {
          //   if (task["Task ID"] === itemData.item["Task ID"]) {
          //     return task.coreTask;
          //   }
          // })}
          checked={() => {
            // toggleCoreTaskHandler(itemData.item);
          }}
        >
          {itemData.item["Task"]}
        </TaskTile>
      );
    },
    [storeTasks]
  );

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
          keyExtractor={(item) => item["Task ID"].toString()}
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Help"
          iconName="help-circle-outline"
          onPress={() => {
            Alert.alert(
              "Help",
              "Select tasks that you have done in past jobs or outside work!",
              [{ text: "OK" }]
            );
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default modalProvider(LifeTasksScreen);
