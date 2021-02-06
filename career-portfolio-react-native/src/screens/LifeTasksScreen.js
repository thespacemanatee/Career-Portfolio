import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
// import ContactListContainer from "../../components/contactListContainer";
import modalProvider from "./modalProvider";
import { Text } from "react-native-paper";

import ScreenTitle from "../components/ui/ScreenTitle";
import AddTask from "../components/bottom_sheets/AddTask";
import AddByAction from "../components/bottom_sheets/AddByAction";
import AddByOccupation from "../components/bottom_sheets/AddByOccupation";

const LifeTasksScreen = (props) => {
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
  return (
    <View style={styles.container}>
      <ScreenTitle>
        What other tasks have you done in past jobs, or outside work?
      </ScreenTitle>

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
      />

      <BottomSheetModal
        name="Occupation"
        ref={bottomSheetOccupationRef}
        index={1}
        snapPoints={snapPoints}
        dismissOnPanDown={false}
        children={renderBottomSheetContent("Occupation")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#dfdfdf",
  },
  buttonContainer: {
    marginBottom: 6,
  },
  contentContainer: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 20,
  },
  titleContainer: {
    marginLeft: 20,
  },
  title: {
    fontSize: 30,
  },
});

export default modalProvider(LifeTasksScreen);