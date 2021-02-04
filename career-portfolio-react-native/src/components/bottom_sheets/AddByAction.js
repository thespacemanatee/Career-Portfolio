import React from "react";
import { StyleSheet, View } from "react-native";
import { Title, Text, Button } from "react-native-paper";

const AddByAction = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title>ADD BY TASK</Title>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={props.onPress.back}>BACK</Button>
        <Button onPress={props.onPress.back}>ADD</Button>
      </View>
    </View>
  );
};

export default AddByAction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    marginLeft: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    margin: 20,
    // backgroundColor: "red",
  },
});
