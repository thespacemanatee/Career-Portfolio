import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const ScreenTitle = (props) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.titleText}>{props.children}</Text>
    </View>
  );
};

export default ScreenTitle;

const styles = StyleSheet.create({
  textContainer: {
    marginLeft: 5,
    marginRight: 40,
    marginBottom: 10,
    height: 40,
  },
  titleText: {
    fontSize: 20,
    textAlign: "left",
  },
});
