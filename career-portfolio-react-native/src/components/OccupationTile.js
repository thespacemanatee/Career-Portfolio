import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { Text, FAB } from "react-native-paper";

import Colors from "../constants/Colors";

const OccupationTile = (props) => {
  let TouchableCustom = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCustom = TouchableNativeFeedback;
  }

  return (
    <TouchableCustom onPress={props.onClick}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </TouchableCustom>
  );
};

export default OccupationTile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    height: 50,
    backgroundColor: Colors.accent,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 0.5,
  },
  text: {
    textAlign: "left",
  },
});
