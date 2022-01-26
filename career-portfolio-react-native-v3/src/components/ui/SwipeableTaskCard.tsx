import React, { useEffect, useMemo, useState } from "react";
import type { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { useWindowDimensions, Platform, View, StyleSheet } from "react-native";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import { TaskCard } from "./TaskCard";

const OFFSET_Y = -50;

interface SwipeableTaskCardProps {
  source: ImageSourcePropType;
  index: number;
  iwaId: string;
  taskSet: number;
  taskIndex: number;
  onSwipeRight: (iwaId: string) => void;
  onSwipeLeft: () => void;
  swipeProgress?: (value: number) => void;
  style?: StyleProp<ViewStyle>;
}

export const SwipeableTaskCard = ({
  source,
  index,
  iwaId,
  taskSet,
  taskIndex,
  onSwipeRight,
  onSwipeLeft,
  swipeProgress,
  style,
}: SwipeableTaskCardProps) => {
  const [enabled, setEnabled] = useState(false);
  const offset = useSharedValue({ x: 0 });
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(OFFSET_Y);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const { width } = useWindowDimensions();
  const snapPoints = useMemo(() => [-width, 0, width], [width]);

  useDerivedValue(() => {
    if (swipeProgress) {
      runOnJS(swipeProgress)(translateX.value / (width / 2));
    }
  });

  useEffect(() => {
    if (index === 0) {
      translateY.value = withTiming(0);
      scale.value = withTiming(1, {}, () => {
        runOnJS(setEnabled)(true);
      });
    }
  }, [index, scale, translateY]);

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
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(dest, { velocity: velocityX });
      rotate.value = withTiming(0, {}, () => {
        if (dest > 0) {
          runOnJS(onSwipeRight)(iwaId);
        } else if (dest < 0) {
          runOnJS(onSwipeLeft)();
        }
      });
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
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(dest, { velocity: velocityX });
      rotate.value = withTiming(0, {}, () => {
        if (dest > 0) {
          runOnJS(onSwipeRight)(iwaId);
        } else if (dest < 0) {
          runOnJS(onSwipeLeft)();
        }
      });
    })
    .enabled(enabled);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={[styles.container, style]} pointerEvents="box-none">
      {Platform.OS === "web" ? (
        <PanGestureHandler onGestureEvent={onGestureEvent} enabled={enabled}>
          <Animated.View style={animatedStyle}>
            <TaskCard source={source} taskSet={taskSet} taskIndex={taskIndex} />
          </Animated.View>
        </PanGestureHandler>
      ) : (
        <GestureDetector gesture={gesture}>
          <Animated.View style={animatedStyle}>
            <TaskCard source={source} taskSet={taskSet} taskIndex={taskIndex} />
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
});
