import React from "react";
import { TextProps as RNTextProps, StyleSheet, TextInput } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";

const styles = StyleSheet.create({
  baseStyle: {
    color: "black",
  },
});
Animated.addWhitelistedNativeProps({ text: true });

interface TextProps {
  text: Animated.SharedValue<string>;
  style?: Animated.AnimateProps<RNTextProps>["style"];
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const ReText: React.FC<TextProps> = (props) => {
  const { text, style } = { style: {}, ...props };
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
    } as any;
  });
  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      value={text.value}
      style={[styles.baseStyle, style]}
      {...{ animatedProps }}
    />
  );
};

export default ReText;
