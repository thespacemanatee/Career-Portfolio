import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";

import Colors from "../constants/Colors";

const OccupationTile = (props) => {
  let TouchableCustom = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCustom = TouchableNativeFeedback;
  }

  const { onClick } = props;
  const { children } = props;

  return (
    <TouchableCustom onPress={onClick}>
      <View style={styles.container}>
        <Text style={styles.text}>{children}</Text>
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
    backgroundColor: Colors.tileBackground,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 0.5,
  },
  text: {
    textAlign: "left",
  },
});
