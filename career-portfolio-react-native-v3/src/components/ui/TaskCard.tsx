import React, { useMemo } from "react";
import type { ImageSourcePropType } from "react-native";
import {
  ImageBackground,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { FONT_SIZE, SPACING } from "../../resources";
import { ThemedText } from "../typography";
import { getNumberWithOrdinal } from "../../utils";

const aspectRatio = 3 / 2;

type TaskCardProps = {
  source: ImageSourcePropType;
  taskSet: number;
  taskIndex: number;
};

export const TaskCard = ({ source, taskSet, taskIndex }: TaskCardProps) => {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const CARD_WIDTH = useMemo(() => width - SPACING.spacing64, [width]);

  return (
    <View>
      <ImageBackground
        source={source}
        style={[
          {
            width: CARD_WIDTH,
            height: CARD_WIDTH * aspectRatio,
          },
          styles.imageBackground,
        ]}
        resizeMode="contain"
      >
        <LinearGradient
          colors={["transparent", "black"]}
          style={styles.labelBackground}
        >
          <ThemedText style={styles.labelText}>
            <ThemedText style={styles.taskText}>{`${getNumberWithOrdinal(
              taskIndex + 1
            )} task`}</ThemedText>{" "}
            from{" "}
            <ThemedText style={[{ color: colors.secondary }, styles.setText]}>
              {`the ${getNumberWithOrdinal(taskSet + 1)} set`}
            </ThemedText>{" "}
            of recommendation
          </ThemedText>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flexDirection: "column-reverse",
    borderRadius: SPACING.spacing12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  labelBackground: {
    paddingHorizontal: SPACING.spacing16,
    paddingBottom: SPACING.spacing16,
    paddingTop: SPACING.spacing64,
  },
  labelText: {
    color: "white",
    fontFamily: "regular",
    fontSize: FONT_SIZE.medium,
  },
  taskText: {
    color: "#FF3030",
    fontFamily: "bold",
  },
  setText: {
    fontFamily: "bold",
  },
});
