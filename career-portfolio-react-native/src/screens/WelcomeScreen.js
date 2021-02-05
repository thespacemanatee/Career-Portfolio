import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Text, FAB } from "react-native-paper";
import _ from "lodash";

import { storeVerbs } from "../store/actions/verbs";

import * as data from "../data/career_data.json";
const dataArray = Object.values(data);

const WelcomeScreen = (props) => {
  const dispatch = useDispatch();

  const storeVerbsHandler = (verbs) => {
    dispatch(storeVerbs(verbs));
  };

  const fetchActionVerbs = async () => {
    try {
      const actionVerbs = await getActionVerbsArray();
      // console.log(actionVerbs);
      storeVerbsHandler(actionVerbs);
    } catch {
      console.log("Error in fetchActionVerbs");
    }
  };

  useEffect(() => {
    fetchActionVerbs();
  }, []);

  const getActionVerbsArray = () => {
    return new Promise((resolve, reject) => {
      const tempArray = [];
      dataArray.forEach((element) => {
        const { Task } = element;
        const actionVerb = (Task + "").split(/[ ,]+/, 1).toString();
        if (
          !tempArray.find((v) =>
            _.isEqual((v + "").split(/[ ,]+/, 1).toString(), actionVerb)
          )
        )
          tempArray.push(actionVerb);
      });
      tempArray.sort();
      // console.log(tempArray);
      resolve(tempArray);
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>DISCOVERING YOUR PORTFOLIO</Text>
      </View>

      <View style={styles.fabContainer}>
        <FAB
          icon="arrow-forward-outline"
          onPress={() => props.navigation.push("SelectOccupation")}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    margin: 30,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 20,
  },
  fabContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
