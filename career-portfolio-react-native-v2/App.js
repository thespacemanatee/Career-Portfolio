import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Platform } from "react-native";
import * as eva from "@eva-design/eva";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ApplicationProvider,
  IconRegistry,
  StyleService,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import store from "./src/app/store";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [ready, setReady] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      // eslint-disable-next-line global-require
      "SFProDisplay-Regular": require("./assets/fonts/SFProDisplay-Regular.ttf"),

      // eslint-disable-next-line global-require
      "SFProDisplay-Bold": require("./assets/fonts/SFProDisplay-Bold.ttf"),
    });
  };

  const loadAppAssets = async () => {
    await loadFonts();
  };

  if (!ready) {
    return (
      <AppLoading
        startAsync={loadAppAssets}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={store}>
        <ApplicationProvider {...eva} theme={eva.light}>
          {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
          <SafeAreaProvider style={styles.screen}>
            <AppNavigator />
          </SafeAreaProvider>
        </ApplicationProvider>
      </Provider>
    </>
  );
}

const styles = StyleService.create({
  screen: {
    flex: 1,
  },
});
