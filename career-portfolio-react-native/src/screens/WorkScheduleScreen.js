import React from "react";
import { StyleSheet, Text, View } from "react-native";

const WorkScheduleScreen = ({route, navigation, props}) => {
  return (
    <View>
      <Text>{route.params.chosenOccupation}</Text>
    </View>
  );
};

export default WorkScheduleScreen;

const styles = StyleSheet.create({});
