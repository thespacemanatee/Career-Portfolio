import React, { useMemo } from "react";
import type { ImageSourcePropType } from "react-native";
import { useWindowDimensions, Platform, View, StyleSheet } from "react-native";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import { SPACING } from "../../resources";

import { TaskCard } from "./TaskCard";

interface SwipeableTaskCardProps {
  source: ImageSourcePropType;
  index?: number;
}

export const SwipeableTaskCard = ({
  source,
  index,
}: SwipeableTaskCardProps) => {
  const offset = useSharedValue({ x: 0, y: 0 });
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const { width } = useWindowDimensions();
  const SNAP_POINTS = useMemo(() => [-width, 0, width], [width]);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      const newX = ctx.x + translationX;
      translateX.value = newX;
      rotate.value = newX / 10;
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      translateX.value = withSpring(dest, { velocity: velocityX });
      rotate.value = withTiming(0);
    },
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      offset.value.x = translateX.value;
    })
    .onUpdate(({ translationX }) => {
      const newX = offset.value.x + translationX;
      translateX.value = newX;
      rotate.value = newX / 10;
    })
    .onEnd(({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      translateX.value = withSpring(dest, { velocity: velocityX });
      rotate.value = withTiming(0);
    });

  return (
    <View style={styles.container} pointerEvents="box-none">
      {Platform.OS === "web" ? (
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.card, style]}>
            <TaskCard source={source} index={index} />
          </Animated.View>
        </PanGestureHandler>
      ) : (
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.card, style]}>
            <TaskCard source={source} index={index} />
          </Animated.View>
        </GestureDetector>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: SPACING.spacing12,
    overflow: "hidden",
  },
});
