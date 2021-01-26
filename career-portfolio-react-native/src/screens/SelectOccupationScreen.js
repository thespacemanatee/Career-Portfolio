import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import {
  useTheme,
  Title,
  Text,
  TextInput,
  FAB,
  Button,
  TouchableRipple,
} from "react-native-paper";
import axios from "axios";
import { Buffer } from "buffer";

const username = "singapore_university";
const password = "3594cgj";
const token = Buffer.from(`${username}:${password}`, "utf8").toString("base64");

const getSearchResults = (occupationKeyword) => {
  const url = `https://services.onetcenter.org/ws/online/search?keyword=${occupationKeyword}&start=1&end=100`;
  axios
    .get(url, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
    });
};

const SelectOccupationScreen = (props) => {
  const [text, setText] = React.useState("");

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>What is your occupation?</Text>
        <Text style={styles.subtitleText}>
          If you are unemployed, please enter your previous occupation!
        </Text>
      </View>
      <TextInput
        label="Please enter your occupation"
        mode="outlined"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => {
            getSearchResults(text);
          }}
        >
          Search
        </Button>
      </View>
      <FlatList />
      <View style={styles.fabContainer}>
        <FAB
          icon="arrow-forward-outline"
          onPress={() => props.navigation.push("WorkSchedule")}
        />
      </View>
    </View>
  );
};

export default SelectOccupationScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    margin: 30,
  },
  textContainer: {
    // flex: 1,
    marginLeft: 40,
    marginRight: 40,
    height: 175,
  },
  titleText: {
    fontSize: 40,
    textAlign: "center",
    // marginBottom: 20,
  },
  subtitleText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  fabContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
