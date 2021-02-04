import React from "react";
import { StyleSheet, View } from "react-native";
import { Title, Text, Button } from "react-native-paper";

const AddByAction = (props) => {
  return (
    <View>
      <Button onPress={props.onPress}>{props.type}</Button>
    </View>
  );
};

export default AddByAction;

const styles = StyleSheet.create({});
