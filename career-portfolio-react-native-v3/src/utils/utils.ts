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

export const getNumberWithOrdinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
