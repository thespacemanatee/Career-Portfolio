import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { JobClassScreen } from "../screens/JobClassScreen";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="JobClass" component={JobClassScreen} />
    </Stack.Navigator>
  );
};
