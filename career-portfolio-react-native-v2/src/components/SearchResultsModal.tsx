import React from "react";
import { FlatList, TouchableOpacity, useWindowDimensions } from "react-native";
import { Card, Modal, StyleService } from "@ui-kitten/components";

import CustomText from "./CustomText";
import ListEmptyComponent from "./ListEmptyComponent";

const ITEM_HEIGHT = 40;

const SearchResultsModal = ({ data, onSelect }) => {
  const { width, height } = useWindowDimensions();

  const ResultsItem = React.memo(({ item }: { item: string }) => (
    <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
      <CustomText numberOfLines={1}>{item}</CustomText>
    </TouchableOpacity>
  ));

  const renderListItems = ({ item }) => {
    return <ResultsItem item={item} />;
  };

  const renderEmptyComponent = () => (
    <ListEmptyComponent label="NO ACTIONS FOUND" />
  );

  const getItemLayout = (itemData: any[], index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <Modal
      visible={data.length > 0}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => onSelect(null)}
    >
      <Card
        style={{
          height: data.length * ITEM_HEIGHT + 10 * 2,
          width: (width / 4) * 3,
          maxHeight: (height / 3) * 2,
        }}
        disabled
      >
        <FlatList
          data={data}
          renderItem={renderListItems}
          keyExtractor={(item, index) => String(index)}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={styles.contentContainer}
          getItemLayout={getItemLayout}
          showsVerticalScrollIndicator={false}
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
  item: {
    height: ITEM_HEIGHT,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
