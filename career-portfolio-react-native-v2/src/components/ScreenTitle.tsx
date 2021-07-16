import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import CustomText from "./CustomText";

interface ScreenTitleProps extends ViewProps {
  title: string;
}

const ScreenTitle: React.FC<ScreenTitleProps> = ({
  title,
  children,
  style,
}) => {
  return (
    <View style={style}>
      <CustomText style={styles.title} fontFamily="extraBold">
        {title}
      </CustomText>
      {children && <View style={styles.subtitleContainer}>{children}</View>}
    </View>
  );
};

export default ScreenTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  subtitleContainer: {
    marginVertical: 12,
  },
});
