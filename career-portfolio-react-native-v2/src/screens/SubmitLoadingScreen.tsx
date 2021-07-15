import React, { useEffect } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";

import { LottieView } from "..";
import { saveResults } from "../app/features/results/resultsSlice";
import { useAppDispatch } from "../app/hooks";
import CustomText from "../components/CustomText";
import { submissionProgressRef } from "../navigation/NavigationHelper";
import useFetchResults from "../helpers/hooks/useFetchResults";
import { saveUserInput } from "../helpers/utils";

const SubmitLoadingScreen = ({ navigation, route }) => {
  const { payload } = route.params;

  const { height } = Dimensions.get("window");

  const dispatch = useAppDispatch();

  const { result, error } = useFetchResults(payload);

  useEffect(() => {
    if (result) {
      saveUserInput(payload).then(() => {
        dispatch(saveResults(result));
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: "Home" },
              {
                name: "History",
                state: {
                  index: 1,
                  routes: [{ name: "Past Results" }, { name: "Results" }],
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
      navigation.goBack();
    }
  }, [dispatch, error, navigation, payload, result]);

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
