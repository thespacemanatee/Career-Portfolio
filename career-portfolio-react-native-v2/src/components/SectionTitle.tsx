import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, children }) => {
  return (
    <>
      <CustomText style={styles.title} fontFamily="bold">
        {title}
      </CustomText>
      <View style={styles.subtitleContainer}>{children}</View>
    </>
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
