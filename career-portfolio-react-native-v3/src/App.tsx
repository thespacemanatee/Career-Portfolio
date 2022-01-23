import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { gestureHandlerRootHOC } from "react-native-gesture-handler"

import { AppNavigator } from "./navigation/AppNavigator";
import { TSSTheme } from "./theme";
import { injectWebCss } from "./utils";
import { store } from "./app/store";

export const App = () => {
  injectWebCss();

  const [loaded] = useFonts({
    black: require("../assets/fonts/Poppins-Black.ttf"),
    blackItalic: require("../assets/fonts/Poppins-BlackItalic.ttf"),
    bold: require("../assets/fonts/Poppins-Bold.ttf"),
    boldItalic: require("../assets/fonts/Poppins-BoldItalic.ttf"),
    extraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    extraBoldItalic: require("../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    extraLight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
    extraLightItalic: require("../assets/fonts/Poppins-ExtraLightItalic.ttf"),
    italic: require("../assets/fonts/Poppins-Italic.ttf"),
    light: require("../assets/fonts/Poppins-Light.ttf"),
    lightItalic: require("../assets/fonts/Poppins-LightItalic.ttf"),
    medium: require("../assets/fonts/Poppins-Medium.ttf"),
    mediumItalic: require("../assets/fonts/Poppins-MediumItalic.ttf"),
    regular: require("../assets/fonts/Poppins-Regular.ttf"),
    semiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    semiBoldItalic: require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),
    thin: require("../assets/fonts/Poppins-Thin.ttf"),
    thinItalic: require("../assets/fonts/Poppins-ThinItalic.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer theme={TSSTheme}>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

registerRootComponent(App);
