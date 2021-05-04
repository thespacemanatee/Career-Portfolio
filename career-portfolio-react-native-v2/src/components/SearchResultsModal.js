import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Card, Modal, StyleService } from "@ui-kitten/components";

import CustomText from "./CustomText";

const SearchResultsModal = ({ data, onSelect }) => {
  const renderListItems = (itemData) => {
    return (
      <TouchableOpacity onPress={() => onSelect(itemData.item)}>
        <CustomText>{itemData.item}</CustomText>
      </TouchableOpacity>
    );
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyComponent}>
      <CustomText bold>NO ACTIONS FOUND</CustomText>
    </View>
  );

  return (
    <Modal
      visible={data.length > 0}
      backdropStyle={styles.backdrop}
      onBackdropPress={onSelect}
    >
      <Card style={{ height: 500, width: 300 }} disabled>
        <FlatList
          data={data}
          renderItem={renderListItems}
          keyExtractor={(item, index) => String(index)}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={styles.contentContainer}
        />
      </Card>
    </Modal>
  );
};

export default SearchResultsModal;

const styles = StyleService.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
