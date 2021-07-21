/* eslint-disable global-require */
import React from "react";
import { StyleSheet, Image, View } from "react-native";
import CustomText from "../CustomText";

const ICON_SIZE = 50;

const RankIcon = ({ rank }) => {
  if (rank === 1) {
    return (
      <Image
        source={require("../../../assets/1st-place.png")}
        style={styles.rankIcon}
      />
    );
  }
  if (rank === 2) {
    return (
      <Image
        source={require("../../../assets/2nd-place.png")}
        style={styles.rankIcon}
      />
    );
  }
  if (rank === 3) {
    return (
      <Image
        source={require("../../../assets/3rd-place.png")}
        style={styles.rankIcon}
      />
    );
  }

  return (
    <View style={styles.rankContainer}>
      <CustomText style={styles.rankText}>{rank}</CustomText>
    </View>
  );
};

export default RankIcon;

const styles = StyleSheet.create({
  rankIcon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
  },
  rankContainer: {
    height: ICON_SIZE,
    justifyContent: "center",
  },
  rankText: {
    fontSize: 24,
  },
});
