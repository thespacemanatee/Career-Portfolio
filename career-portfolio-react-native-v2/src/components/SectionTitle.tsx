import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import CustomText from "./CustomText";

interface SectionTitleProps extends ViewProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  children,
  style,
}) => {
  return (
    <View style={style}>
      <CustomText style={styles.title} fontFamily="bold">
        {title}
      </CustomText>
      <View style={styles.subtitleContainer}>{children}</View>
    </View>
  );
};

export default SectionTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  subtitleContainer: {
    marginVertical: 12,
  },
});
