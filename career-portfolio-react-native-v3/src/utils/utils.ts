import { Platform } from "react-native";

export const injectWebCss = () => {
  // Only on web
  if (Platform.OS !== "web") {
    return;
  }

  // Inject style
  const style = document.createElement("style");
  style.textContent =
    "textarea, select, input, button { outline: none!important; }";
  return document.head.append(style);
};

export const getPositionalText = (index: number) => {
  switch (index) {
    case 1: {
      return "1st";
    }
    case 2: {
      return "2nd";
    }
    case 3: {
      return "3rd";
    }
    default: {
      return `${index}th`;
    }
  }
};
