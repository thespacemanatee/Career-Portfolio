import React from "react";
import { StyleSheet, View } from "react-native";
import { Title, Text, Button } from "react-native-paper";

const AddByOccupation = (props) => {
  return (
    <View>
      <Button onPress={props.onPress}>{props.type}</Button>
    </View>
  );
};

export default AddByOccupation;

const styles = StyleSheet.create({});
