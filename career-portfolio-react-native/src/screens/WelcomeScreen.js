import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, FAB } from "react-native-paper";

import DefaultScreen from "../components/ui/DefaultScreen";

const WelcomeScreen = (props) => {
  return (
    <DefaultScreen
      title="DISCOVERING YOUR PORTFOLIO"
      onPressFAB={() => props.navigation.push("SelectOccupation")}
      titleStyle={styles.titleText}
    ></DefaultScreen>
    // <View style={styles.screen}>
    //   <View style={styles.textContainer}>
    //     <Text style={styles.titleText}>DISCOVERING YOUR PORTFOLIO</Text>
    //   </View>

    //   <View style={styles.fabContainer}>
    //     <FAB
    //       icon="arrow-forward-outline"
    //       onPress={() => props.navigation.push("SelectOccupation")}
    //     />
    //   </View>
    // </View>
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
  fabContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
