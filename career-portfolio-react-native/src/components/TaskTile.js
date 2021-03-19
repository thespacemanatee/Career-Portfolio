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
  const [selectedDelete, setSelectedDelete] = useState(false);
  const { isChecked } = props;
  const { deleteMode } = props;
  const { children } = props;
  const { checkBoxEnabled } = props;

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  let TouchableCustom = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCustom = TouchableNativeFeedback;
  }

  useEffect(() => {
    if (!deleteMode) {
      setSelectedDelete(false);
    }
  }, [deleteMode]);

  return (
    <TouchableCustom
      onPress={() => {
        if (props.deleteMode) {
          setSelectedDelete(!selectedDelete);
          props.onClick();
        } else if (props.addLifeTaskMode) {
          props.onClick();
        }
      }}
      onLongPress={() => {
        props.onLongPress();
        setSelectedDelete(!selectedDelete);
      }}
    >
      <View
        style={{
          ...styles.container,
          // eslint-disable-next-line no-nested-ternary
          backgroundColor: deleteMode
            ? selectedDelete
              ? Colors.tileBackgroundDelete
              : Colors.tileBackground
            : Colors.tileBackground,
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={2}>
            {children}
          </Text>
        </View>
        {checkBoxEnabled && (
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
  deleteMode: false,
  checkBoxEnabled: true,
  onPress: () => {},
  onLongPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
