import React, { useCallback } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "@ui-kitten/components";
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
  onetTitle: string;
  onPress: (id: string) => void;
}

const ResultsOverviewCard: React.FC<ResultsOverviewCardProps> = ({
  index,
  id,
  date,
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
        <View>
          <CustomText style={styles.smallText}>Selected Occupation</CustomText>
          <CustomText fontFamily="bold" style={styles.onetTitle}>
            {onetTitle}
          </CustomText>
        </View>
        <View style={styles.footer}>
          <CustomText style={styles.smallText}>
            {new Date(date).toLocaleString()}
          </CustomText>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ResultsOverviewCard;

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderRadius: 8,
    padding: 12,
    justifyContent: "space-between",
  },
  smallText: {
    fontSize: 12,
  },
  onetTitle: {
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
