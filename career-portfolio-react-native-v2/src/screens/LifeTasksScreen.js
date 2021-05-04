import React from "react";
import { View, Platform } from "react-native";
import {
  Divider,
  Layout,
  TopNavigation,
  StyleService,
  Button,
  Icon,
  TopNavigationAction,
} from "@ui-kitten/components";
import alert from "../components/CustomAlert";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const HelpIcon = (props) => (
  <Icon {...props} name="question-mark-circle-outline" />
);

const LifeTasksScreen = ({ navigation }) => {
  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => {
        if (Platform.OS === "web") {
          window.history.back();
        } else {
          navigation.goBack();
        }
      }}
    />
  );

  const HelpAction = () => (
    <TopNavigationAction
      icon={HelpIcon}
      onPress={() => {
        alert(
          "Help",
          "A task is made up of an action, object and purpose.\nExample: Interview (action) people (object) to understand perspective on current social trends (purpose)."
        );
      }}
    />
  );

  return (
    <View style={styles.screen}>
      <TopNavigation
        title="Choose your Life Tasks"
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={HelpAction}
      />
      <Divider />
      <Layout style={styles.layout}>
        <Button
          onPress={() => {
            navigation.navigate("AddByAction");
          }}
        >
          Add by Action
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("AddByOccupation");
          }}
        >
          Add by Occupation
        </Button>
      </Layout>
    </View>
  );
};

export default LifeTasksScreen;

const styles = StyleService.create({
  screen: {
    flex: 1,
  },
  layout: {
    flex: 1,
    padding: 10,
  },
});
