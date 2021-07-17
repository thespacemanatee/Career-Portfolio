import React, { useCallback } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Icon, useTheme } from "@ui-kitten/components";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

import CustomText from "./CustomText";

const WIDTH = Dimensions.get("window").width;

interface ResultsOverviewCardProps {
  index: number;
  id: string;
  date: Date;
  editedDate: Date;
  onetTitle: string;
  onPress: (id: string) => void;
}

const ResultsOverviewCard: React.FC<ResultsOverviewCardProps> = ({
  index,
  id,
  date,
  editedDate,
  onetTitle,
  onPress,
}) => {
  const theme = useTheme();

  const progress = useSharedValue(0);

  const handleOnPress = () => {
    onPress(id);
  };

  useFocusEffect(
    useCallback(() => {
      progress.value = withDelay(50 * index, withSpring(1));
    }, [index, progress])
  );

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [-WIDTH, 0]);
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={handleOnPress}
        style={[
          styles.container,
          { backgroundColor: theme["color-basic-400"] },
        ]}
      >
        <View style={styles.contentContainer}>
          <View>
            <CustomText style={styles.smallText}>
              Selected Occupation
            </CustomText>
            <CustomText
              fontFamily="bold"
              style={styles.onetTitle}
              numberOfLines={2}
            >
              {onetTitle}
            </CustomText>
          </View>
          {date && (
            <CustomText style={styles.smallText}>
              {new Date(date).toLocaleString()}
            </CustomText>
          )}
          {editedDate && (
            <CustomText style={styles.smallText}>
              {`Edited: ${new Date(editedDate).toLocaleString()}`}
            </CustomText>
          )}
        </View>
        <Icon name="chevron-right" style={styles.icon} fill="black" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ResultsOverviewCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    height: 120,
    padding: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
  },
  smallText: {
    fontSize: 12,
  },
  onetTitle: {
    fontSize: 16,
  },
  icon: {
    height: 32,
    width: 32,
  },
});
