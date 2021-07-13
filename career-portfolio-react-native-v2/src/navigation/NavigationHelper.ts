import React, { createRef } from "react";

export const submissionNavigationRef: React.MutableRefObject<any> = createRef();

export const isReadyRef: React.MutableRefObject<boolean | null> = createRef();

export function navigate(name, params) {
  if (isReadyRef.current && submissionNavigationRef.current) {
    // Perform navigation if the app has mounted
    submissionNavigationRef.current.navigate(name, params);
  }
}

export function goBack() {
  if (isReadyRef.current && submissionNavigationRef.current) {
    // Perform navigation if the app has mounted
    submissionNavigationRef.current.goBack();
  }
}
