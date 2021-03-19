import React from "react";
import { StyleSheet, View } from "react-native";
import { Title, Text, Button } from "react-native-paper";

const AddTask = (props) => {
  const { onPress } = props;
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title>ADD TASKS</Title>
        <Text>Search task by:</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={onPress.action}>ACTION</Button>
        <Button onPress={onPress.occupation}>OCCUPATION</Button>
      </View>
    </View>
  );
};

export default AddTask;

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
