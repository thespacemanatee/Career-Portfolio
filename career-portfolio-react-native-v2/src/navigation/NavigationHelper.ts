import React, { createRef } from "react";

export const navigationRef: React.MutableRefObject<any> = createRef();

export const isReadyRef: React.MutableRefObject<boolean | null> = createRef();

export const navigate = (name: string, params) => {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  }
};

export const goBack = () => {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.goBack();
  }
};
