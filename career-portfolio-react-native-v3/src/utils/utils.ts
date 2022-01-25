import { Platform } from "react-native";

import type { RecommendedTask } from "../app/features/tasks";

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

export const toTopRecommendedTask = (tasks: string[][]): RecommendedTask[] =>
  tasks
    .slice(0, 10)
    .map((task: string[], index) => ({
      index,
      iwaId: task[0]!,
      similarityScore: parseFloat(task[1]!),
    }))
    .reverse();
