import React from "react";
import { View } from "react-native";
import {
  Text,
  Divider,
  Layout,
  TopNavigation,
  StyleService,
  Button,
} from "@ui-kitten/components";

const CoreTasksScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <TopNavigation title="Authentication" alignment="center" />
      <Divider />
      <Layout style={styles.layout}>
        <Button>HOME</Button>
      </Layout>
    </View>
  );
};

export default CoreTasksScreen;

const styles = StyleService.create({
  screen: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
