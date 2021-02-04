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
  const snapPoints = useMemo(() => ["10%", "70%"], []);

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

  const initialLoadBottomSheet = useCallback(() => {
    if (bottomSheetAddRef.current) {
      bottomSheetAddRef.current.present();
    }
  }, []);

  useEffect(() => {
    initialLoadBottomSheet();
  }, [initialLoadBottomSheet]);

  // renders
  const renderBottomSheetContent = useCallback(
    (type, onPress) => {
      if (type === "Add") {
        return <AddTask type={type} onPress={onPress} />;
      } else if (type === "Action") {
        return <AddByAction type={type} onPress={onPress} />;
      } else if (type === "Occupation") {
        return <AddByOccupation type={type} onPress={onPress} />;
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

      {/* <Button style={styles.buttonContainer} onPress={handlePresentAPress}>
        Present Modal A
      </Button>
      <Button style={styles.buttonContainer} onPress={handleDismissAPress}>
        Dismiss Modal A
      </Button>
      <Button style={styles.buttonContainer} onPress={handlePresentBPress}>
        Present Modal B
      </Button>
      <Button style={styles.buttonContainer} onPress={handleDismissBPress}>
        Dismiss Modal B
      </Button>
      <Button style={styles.buttonContainer} onPress={handlePresentCPress}>
        Present Modal C
      </Button>
      <Button style={styles.buttonContainer} onPress={handleDismissCPress}>
        Dismiss Modal C
      </Button>

      <Button style={styles.buttonContainer} onPress={handleDismissAllPress}>
        Dismiss All Modal
      </Button>

      <Button style={styles.buttonContainer} onPress={handleDismissByHookPress}>
        Dismiss A By Hook
      </Button> */}

      <BottomSheetModal
        name="Add"
        index={1}
        ref={bottomSheetAddRef}
        snapPoints={["10%", "30%"]}
        dismissOnPanDown={false}
        children={renderBottomSheetContent("Add", handlePresentAction)}
      />

      <BottomSheetModal
        name="Action"
        index={1}
        ref={bottomSheetActionRef}
        snapPoints={snapPoints}
        dismissOnPanDown={false}
        children={renderBottomSheetContent("Action", handlePresentOccupation)}
      />

      <BottomSheetModal
        name="Occupation"
        ref={bottomSheetOccupationRef}
        index={1}
        snapPoints={snapPoints}
        dismissOnPanDown={false}
        children={renderBottomSheetContent(
          "Occupation",
          handleDismissOccupation
        )}
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
