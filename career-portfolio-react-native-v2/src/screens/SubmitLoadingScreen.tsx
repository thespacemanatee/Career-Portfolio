import React, { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { unwrapResult } from "@reduxjs/toolkit";
import { Layout } from "@ui-kitten/components";

import { LottieView } from "..";
import { fetchResults } from "../app/features/results/resultsSlice";
import { useAppDispatch } from "../app/hooks";
import CustomText from "../components/CustomText";

const SubmitLoadingScreen = ({ navigation, route }) => {
  const { payload } = route.params;

  const { height } = Dimensions.get("window");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const postResult = () => {
      dispatch(fetchResults(payload))
        .then(unwrapResult)
        .then(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "Welcome" }, { name: "ResultsStack" }],
            })
          );
        })
        .catch(() => {
          Alert.alert(
            "Error",
            "Unable to contact the server. Please try again later!"
          );
          navigation.goBack();
        });
    };
    postResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={styles.screen}>
      <View style={{ height: height / 4 }}>
        <LottieView
          // eslint-disable-next-line global-require
          source={require("../../assets/submit-loading.json")}
          autoPlay
          loop
        />
      </View>
      <View style={styles.loadingText}>
        <CustomText fontFamily="bold" style={styles.loadingText}>
          You are on your way...
        </CustomText>
      </View>
    </Layout>
  );
};

export default SubmitLoadingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  loadingText: {
    alignItems: "center",
    fontSize: 20,
  },
});
