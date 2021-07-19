import { useState, useRef, useCallback } from "react";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";

const useHandleScroll = () => {
  const [showButton, setShowButton] = useState(true);

  const scrollOffset = useRef(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffset = event.nativeEvent.contentOffset.y;
      setShowButton(
        !(currentOffset > 0 && currentOffset > scrollOffset.current)
      );
      scrollOffset.current = currentOffset;
    },
    []
  );

  return { handleScroll, showButton };
};

export default useHandleScroll;
