import React from "react";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

import ScreenTitle from "../ui/ScreenTitle";

const DefaultScreen = (props) => {
  return (
    <View style={styles.screen}>
      <ScreenTitle>{props.title}</ScreenTitle>
      {props.children}
      <View style={styles.fabContainer}>
        <FAB icon="arrow-forward-outline" onPress={props.onPress} />
      </View>
    </View>
  );
};

export default DefaultScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    margin: 30,
  },
  fabContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 10,
  },
});
