import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { Text, Checkbox } from "react-native-paper";

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
    <TouchableCustom onPress={props.onClick} onLongPress={props.onLongPress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={2}>
            {props.children}
          </Text>
        </View>
        {props.checkBoxEnabled && (
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
              props.checked();
            }}
          />
        )}
      </View>
    </TouchableCustom>
  );
};

export default TaskTile;

TaskTile.defaultProps = {
  checkBoxEnabled: true,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: Colors.tileBackground,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: "#ccc",
    borderWidth: 0.5,
  },
  text: {
    textAlign: "left",
  },
  textContainer: {
    flex: 1,
  },
});
