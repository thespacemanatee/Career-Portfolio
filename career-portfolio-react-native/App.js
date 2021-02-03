import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import tasksReducer from "./src/store/reducers/task";
import { RootNavigator } from "./src/navigation/AppNavigator";
import Colors from "./src/constants/Colors";

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent,
  },
};

export default function App() {
  return (
    <Provider store={store}>
    <PaperProvider
      theme={theme}
      settings={{
        icon: (props) => <Ionicons {...props} />,
      }}
    >
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
    </Provider>
  );
}