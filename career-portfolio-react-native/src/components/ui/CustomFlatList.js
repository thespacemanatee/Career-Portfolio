import React from "react";
import { StyleSheet, FlatList, View } from "react-native";

const CustomFlatList = (props) => {
  const { data } = props;
  const { renderItem } = props;
  const { keyExtractor } = props;
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.flatList}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default CustomFlatList;

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  flatList: {
    borderRadius: 10,
    overflow: "hidden",
  },
});
