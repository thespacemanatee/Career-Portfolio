import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";

import { AppNavigator } from "./navigation/AppNavigator";

export const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

registerRootComponent(App);
