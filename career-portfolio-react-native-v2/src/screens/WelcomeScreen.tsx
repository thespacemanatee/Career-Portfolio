import React from "react";
import { View } from "react-native";
import {
  Divider,
  Layout,
  TopNavigation,
  StyleService,
  Button,
} from "@ui-kitten/components";

import CustomText from "../components/CustomText";
import { useAppSelector } from "../app/hooks";

const WelcomeScreen = ({ navigation }) => {
  const count = useAppSelector((state) => state.results.count);
  const handleNext = () => {
    navigation.navigate("Occupations");
  };
  const handleViewResults = () => {
    navigation.navigate("ResultsIntroduction");
  };
  return (
    <View style={styles.screen}>
      <TopNavigation title="Welcome" alignment="center" />
      <Divider />
      <Layout style={styles.layout}>
        <View />
        <CustomText style={styles.title}>Discovering Your Options</CustomText>
        <View>
          <Button style={styles.button} onPress={handleNext}>
            START
          </Button>
          <Button
            disabled={count === null}
            appearance="outline"
            onPress={handleViewResults}
          >
            VIEW RESULTS
          </Button>
        </View>
      </Layout>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleService.create({
  screen: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
  },
  button: {
    marginBottom: 10,
  },
});
