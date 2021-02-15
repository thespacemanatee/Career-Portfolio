import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ResultsScreen = ({route, navigation}) => {
  const results = useSelector((state) => state.database.result);
  console.log(results);
  return (
    <View>
      <Text>{results.count}</Text>
    </View>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({});
