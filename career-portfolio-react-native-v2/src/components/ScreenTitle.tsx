import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

interface ScreenTitleProps {
  title: string;
}

const ScreenTitle: React.FC<ScreenTitleProps> = ({ title, children }) => {
  return (
    <>
      <CustomText style={styles.title} fontFamily="bold">
        {title}
      </CustomText>
      <View style={styles.subtitleContainer}>{children}</View>
    </>
  );
};

export default ScreenTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
  },
  subtitleContainer: {
    marginVertical: 12,
  },
});
