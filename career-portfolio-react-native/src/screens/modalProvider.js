import React from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const withModalProvider = (Component) => () => {
  return (
    <BottomSheetModalProvider>
      <Component />
    </BottomSheetModalProvider>
  );
};

export default withModalProvider;