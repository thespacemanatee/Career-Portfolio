import React from "react";
import { StyleSheet, View } from "react-native";

import DefaultScreen from "../components/ui/DefaultScreen";

const WelcomeScreen = (props) => {
  return (
    <View style={styles.screen}>
      <DefaultScreen
        title="DISCOVERING YOUR PORTFOLIO"
        onPressFAB={() => props.navigation.push("SelectOccupation")}
        titleStyle={styles.titleText}
        containerStyle={styles.textContainer}
      />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    margin: 30,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 20,
  },
  // fabContainer: {
  //   justifyContent: "flex-end",
  //   alignItems: "flex-end",
  // },
});
