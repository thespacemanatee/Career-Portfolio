import React from "react";
import { Card } from "@ui-kitten/components";

import CustomText from "./CustomText";

const OccupationCard = ({ children, onPress }) => {
  const handleOnPress = () => {
    onPress(children);
  };
  return (
    <Card onPress={handleOnPress}>
      <CustomText>{children}</CustomText>
    </Card>
  );
};

const areEqual = (prevProps: any, nextProps: any) => {
  /* if the props are equal, it won't update */
  const isSelectedEqual = nextProps.children === prevProps.children;

  return isSelectedEqual;
};

export default React.memo(OccupationCard, areEqual);
