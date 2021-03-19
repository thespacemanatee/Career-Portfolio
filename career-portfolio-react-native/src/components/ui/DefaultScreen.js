import React from "react";
import { StyleSheet, View } from "react-native";

import ScreenTitle from "./ScreenTitle";

const DefaultScreen = (props) => {
  const { titleStyle } = props;
  const { containerStyle } = props;
  const { title } = props;
  const { children } = props;
  return (
    <View style={styles.screen}>
      <ScreenTitle titleStyle={titleStyle} containerStyle={containerStyle}>
        {title}
      </ScreenTitle>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

export default DefaultScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    margin: 30,
  },
  container: {
    flex: 1,
  },
});
