import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, FlatList, Alert, Image } from "react-native";
import { Card, Title, TextInput, Button, Paragraph } from "react-native-paper";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Buffer } from "buffer";

import DefaultScreen from "../components/ui/DefaultScreen";
import OccupationTile from "../components/OccupationTile";
import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import CustomFlatList from "../components/ui/CustomFlatList";
import { resetCoreTasks } from "../store/actions/task";
import * as taskActions from "../store/actions/task";

const username = "singapore_university";
const password = "3594cgj";
const token = Buffer.from(`${username}:${password}`, "utf8").toString("base64");

const SelectOccupationScreen = (props) => {
  const [text, setText] = useState("");
  const [occupations, setOccupations] = useState();
  const [chosenOccupation, setChosenOccupation] = useState();
  const [searching, setSearching] = useState();

  const dispatch = useDispatch();

  const resetCoreTasksHandler = (occupation) => {
    console.log("Resetting core tasks...");
    dispatch(resetCoreTasks(occupation));
  };

  const renderOccupationTiles = useCallback(
    (itemData) => {
      // console.log(itemData.item);
      return (
        <OccupationTile
          onClick={() => {
            resetCoreTasksHandler(itemData.item);
            setChosenOccupation(itemData.item);
          }}
        >
          {itemData.item}
        </OccupationTile>
      );
    },
    [occupations]
  );

  const getSearchResults = (occupationKeyword) => {
    setOccupations();
    taskActions.setUserInput(occupationKeyword);
    const url = `https://services.onetcenter.org/ws/online/search?keyword=${occupationKeyword}&start=1&end=100`;
    axios
      .get(url, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data.occupation);
        const titles = [];
        response.data.occupation.forEach((item) => {
          // console.log(item.title);
          titles.push(item.title);
        });
        setOccupations(titles);
        setSearching(false);
      })
      .catch((err) => {
        setSearching(false);
      });
  };

  return (
    <DefaultScreen title="What is your occupation?">
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
            setSearching(true);
          }}
          loading={searching}
        >
          Search
        </Button>
      </View>
      {!occupations && searching === false && (
        <View style={styles.errorContainer}>
          <Image
            style={styles.errorImage}
            source={require("../../assets/fail.png")}
          />
        </View>
      )}
      {chosenOccupation && (
        <Card>
          <Card.Content>
            <Title>Chosen Occupation</Title>
            <Paragraph numberOfLines={1}>{chosenOccupation}</Paragraph>
          </Card.Content>
        </Card>
      )}

      <CustomFlatList
        data={occupations}
        renderItem={renderOccupationTiles}
        keyExtractor={(item, index) => item}
      />
    </DefaultScreen>
  );
};

export const screenOptions = (navigationData) => {
  return {
    headerTitle: "Onboarding",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Help"
          iconName="help-circle-outline"
          onPress={() => {
            Alert.alert(
              "Help",
              "If you are unemployed, please enter your previous occupation!",
              [{ text: "OK" }]
            );
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default SelectOccupationScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  errorImage: {
    flex: 1,
    aspectRatio: 1,
  },
});
