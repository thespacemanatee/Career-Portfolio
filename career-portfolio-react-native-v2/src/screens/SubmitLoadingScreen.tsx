import React, { useEffect } from "react";
import { Alert, Dimensions, StyleSheet } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";

import { LottieView } from "..";
import {
  saveResults,
  setRecentlyOpenedId,
} from "../app/features/results/resultsSlice";
import { useAppDispatch } from "../app/hooks";
import CustomText from "../components/CustomText";
import { submissionProgressRef } from "../navigation/NavigationHelper";
import useFetchResults from "../helpers/hooks/useFetchResults";
import { saveUserInput } from "../helpers/utils";

const SubmitLoadingScreen = ({ navigation, route }) => {
  const { payload, id } = route.params;

  const { height } = Dimensions.get("window");

  const dispatch = useAppDispatch();

  const { result, error } = useFetchResults(payload);

  useEffect(() => {
    if (result) {
      saveUserInput(payload, id).then((saveId) => {
        dispatch(saveResults(result));
        dispatch(setRecentlyOpenedId(saveId));
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: "Dashboard" },
              {
                name: "ResultsStack",
                state: {
                  index: 1,
                  routes: [{ name: "ResultsPager" }],
                },
              },
            ],
          })
        );
      });
      submissionProgressRef.current = 0;
    }
    if (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "Unable to contact the server. Please try again later!"
      );
      dispatch(setRecentlyOpenedId(null));
      navigation.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, error, navigation, payload, result]);

  return (
    <Layout style={styles.screen}>
      <LottieView
        // eslint-disable-next-line global-require
        source={require("../../assets/submit-loading.json")}
        autoPlay
        loop
        style={{ height: height / 4 }}
      />
      <CustomText fontFamily="bold" style={styles.loadingText}>
        You are on your way...
      </CustomText>
    </Layout>
  );
};

export default SubmitLoadingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
  },
});
