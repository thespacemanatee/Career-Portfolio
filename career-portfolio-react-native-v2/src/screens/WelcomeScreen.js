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

const WelcomeScreen = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate("Occupations");
  };
  return (
    <View style={styles.screen}>
      <TopNavigation title="Welcome" alignment="center" />
      <Divider />
      <Layout style={styles.layout}>
        <View />
        <CustomText style={{ fontSize: 40, textAlign: "center" }}>
          Discovering Your Options
        </CustomText>
        <View style={{ width: "100%" }}>
          <Button onPress={handleNext}>START</Button>
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
    alignItems: "center",
    padding: 10,
  },
});
