/* eslint-disable global-require */
import React from "react";
import { StyleSheet, Image, View, StyleProp, ImageStyle } from "react-native";

import CustomText from "../CustomText";

interface RankIconProps {
  rank: number;
  size?: number;
  style?: StyleProp<ImageStyle>;
}

const RankIcon: React.FC<RankIconProps> = ({ rank, size = 50, style }) => {
  if (rank === 1) {
    return (
      <Image
        source={require("../../../assets/1st-place.png")}
        style={[{ height: size, width: size }, style]}
      />
    );
  }
  if (rank === 2) {
    return (
      <Image
        source={require("../../../assets/2nd-place.png")}
        style={[{ height: size, width: size }, style]}
      />
    );
  }
  if (rank === 3) {
    return (
      <Image
        source={require("../../../assets/3rd-place.png")}
        style={[{ height: size, width: size }, style]}
      />
    );
  }

  return (
    <View style={[styles.rankContainer, style]}>
      <CustomText style={styles.rankText}>{rank}</CustomText>
    </View>
  );
};

export default RankIcon;

const styles = StyleSheet.create({
  rankContainer: {
    justifyContent: "center",
  },
  rankText: {
    fontSize: 24,
  },
});
