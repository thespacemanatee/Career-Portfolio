import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
// import ContactListContainer from "../../components/contactListContainer";
import modalProvider from "./modalProvider";
import { Title, Text, TextInput, FAB, Button } from "react-native-paper";

import ScreenTitle from "../components/ui/ScreenTitle";

const LifeTasksScreen = (props) => {
  // hooks
  const { dismiss, dismissAll } = useBottomSheetModal();

  // refs
  const bottomSheetModalARef = useRef(null);
  const bottomSheetModalBRef = useRef(null);
  const bottomSheetModalCRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["10%", "70%"], []);

  // callbacks
  const handlePresentAPress = useCallback(() => {
    if (bottomSheetModalARef.current) {
      bottomSheetModalARef.current.present();
    }
  }, []);
  const handleDismissAPress = useCallback(() => {
    if (bottomSheetModalARef.current) {
      bottomSheetModalARef.current.dismiss();
    }
  }, []);
  const handlePresentBPress = useCallback(() => {
    if (bottomSheetModalBRef.current) {
      bottomSheetModalBRef.current.present();
    }
  }, []);
  const handleDismissBPress = useCallback(() => {
    if (bottomSheetModalBRef.current) {
      bottomSheetModalBRef.current.dismiss();
    }
  }, []);
  const handlePresentCPress = useCallback(() => {
    if (bottomSheetModalCRef.current) {
      bottomSheetModalCRef.current.present();
    }
  }, []);
  const handleDismissCPress = useCallback(() => {
    if (bottomSheetModalCRef.current) {
      bottomSheetModalCRef.current.dismiss();
    }
  }, []);
  const handleDismissAllPress = useCallback(() => {
    dismissAll();
  }, [dismissAll]);
  const handleDismissByHookPress = useCallback(() => {
    dismiss("A");
  }, [dismiss]);

  const initialLoadBottomSheet = useCallback(() => {
    if (bottomSheetModalARef.current) {
      bottomSheetModalARef.current.present();
    }
  }, []);

  useEffect(() => {
    initialLoadBottomSheet();
  }, [initialLoadBottomSheet]);

  // renders
  const renderBottomSheetContent = useCallback(
    (title, onPress) => (
      <View style={styles.titleContainer}>
        <Title style={styles.title}>{title}</Title>
        <Button onPress={onPress}>Click Me</Button>
      </View>

      //   <ContactListContainer
      //     title={title}
      //     type="FlatList"
      //     onItemPress={onPress}
      //   />
    ),
    []
  );
  return (
    <View style={styles.container}>
      <Button style={styles.buttonContainer} onPress={handlePresentAPress}>
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
      </Button>

      <BottomSheetModal
        name="A"
        ref={bottomSheetModalARef}
        snapPoints={snapPoints}
        dismissOnPanDown={false}
        children={renderBottomSheetContent("Add Task", handlePresentBPress)}
      />

      <BottomSheetModal
        name="B"
        index={1}
        ref={bottomSheetModalBRef}
        snapPoints={snapPoints}
        dismissOnPanDown={false}
        children={renderBottomSheetContent(
          "Add By Action",
          handlePresentCPress
        )}
      />

      <BottomSheetModal
        name="C"
        ref={bottomSheetModalCRef}
        index={1}
        snapPoints={snapPoints}
        dismissOnPanDown={false}
        children={renderBottomSheetContent(
          "Add By Occupation",
          handleDismissCPress
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
