import React from "react";
import { Card, StyleService } from "@ui-kitten/components";

import CustomText from "./CustomText";

const OccupationCard = (props) => {
  const { children, onPress } = props;
  const handleOnPress = () => {
    onPress(children);
  };
  return (
    <Card onPress={handleOnPress}>
      <CustomText>{children}</CustomText>
    </Card>
  );
};

const areEqual = (prevProps, nextProps) => {
  /* if the props are equal, it won't update */
  const isSelectedEqual = nextProps.children === prevProps.children;

  return isSelectedEqual;
};

export default React.memo(OccupationCard, areEqual);

const styles = StyleService.create({});
