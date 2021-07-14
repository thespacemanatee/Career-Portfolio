import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

interface ListEmptyComponentProps {
  label: string;
}

const ListEmptyComponent: React.FC<ListEmptyComponentProps> = ({ label }) => {
  return (
    <View style={styles.emptyComponent}>
      <CustomText fontFamily="extraBold">{label}</CustomText>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  emptyComponent: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
});
