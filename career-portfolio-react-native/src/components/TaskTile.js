import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { Text, FAB, Checkbox } from "react-native-paper";

import Colors from "../constants/Colors";

const TaskTile = (props) => {
  const [checked, setChecked] = useState(false);
  const { isChecked } = props;

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  let TouchableCustom = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCustom = TouchableNativeFeedback;
  }

  return (
    <TouchableCustom
      onPress={props.onClick}
      onLongPress={() => {
        console.log("Long Press");
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text} numberOfLines={2}>
          {props.children}
        </Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
            props.checked();
          }}
        />
      </View>
    </TouchableCustom>
  );
};

export default TaskTile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: Colors.tileBackground,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderColor: "#ccc",
    borderWidth: 0.5,
  },
  text: {
    textAlign: "left",
  },
});
