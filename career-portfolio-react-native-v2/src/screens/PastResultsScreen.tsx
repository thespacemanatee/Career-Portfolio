import React from "react";
import { StyleSheet, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import ScreenTitle from "../components/ScreenTitle";

const PastResultsScreen = ({ navigation }) => {
  return (
    <Layout style={styles.screen}>
      <ScreenTitle title="History" />
    </Layout>
  );
};

export default PastResultsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
