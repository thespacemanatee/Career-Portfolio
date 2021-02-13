import React from "react";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";
import { Portal } from "react-native-paper";

import ScreenTitle from "../ui/ScreenTitle";

const DefaultScreen = (props) => {
  return (
    <View style={styles.screen}>
      <ScreenTitle
        titleStyle={props.titleStyle}
        containerStyle={props.containerStyle}
      >
        {props.title}
      </ScreenTitle>
      <View style={styles.container}>{props.children}</View>
      <Portal>
        <View style={styles.fabContainer}>
          <FAB icon="arrow-forward-outline" onPress={props.onPressFAB} />
        </View>
      </Portal>
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
  container: {
    flex: 1,
  },
  fabContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: 20,
  },
});
