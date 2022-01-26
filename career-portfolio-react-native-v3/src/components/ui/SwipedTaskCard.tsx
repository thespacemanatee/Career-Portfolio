import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import {
  Pressable,
  useWindowDimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";

import { FONT_SIZE, SPACING } from "../../resources";
import { ThemedText } from "../typography";

type SwipedTaskCardProps = {
  task: string;
  index: number;
  style?: StyleProp<ViewStyle>;
};

export const SwipedTaskCard = ({ task, index, style }: SwipedTaskCardProps) => {
  const { height } = useWindowDimensions();

  return (
    <Pressable style={styles.container}>
      <ImageBackground
        source={{
          uri: `https://picsum.photos/id/${index + 1}/200/300`,
        }}
        style={[{ height: height / 4 }, styles.imageBackground, style]}
      >
        <LinearGradient
          colors={["transparent", "black"]}
          style={styles.labelBackground}
        >
          <ThemedText style={styles.labelText}>{`Task ${
            index + 1
          }`}</ThemedText>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  imageBackground: {
    flexDirection: "column-reverse",
    borderRadius: SPACING.spacing12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  labelBackground: {
    paddingHorizontal: SPACING.spacing16,
    paddingBottom: SPACING.spacing4,
    paddingTop: SPACING.spacing64,
  },
  labelText: {
    color: "white",
    fontFamily: "bold",
    fontSize: FONT_SIZE.medium,
  },
});
