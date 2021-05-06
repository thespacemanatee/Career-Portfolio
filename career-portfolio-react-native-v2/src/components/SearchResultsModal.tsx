import React from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Card, Modal, StyleService } from "@ui-kitten/components";

import CustomText from "./CustomText";

const ITEM_HEIGHT = 40;

const SearchResultsModal = ({ data, onSelect }) => {
  const windowDimensions = useWindowDimensions();
  const { width, height } = windowDimensions;

  const ResultsItem = React.memo(({ item }: { item: string }) => (
    <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
      <CustomText>{item}</CustomText>
    </TouchableOpacity>
  ));

  const renderListItems = ({ item }) => {
    return <ResultsItem item={item} />;
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyComponent}>
      <CustomText bold>NO ACTIONS FOUND</CustomText>
    </View>
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
  emptyComponent: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
});
