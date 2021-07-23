import { ResultsCategory, ResultsConfig } from "../../types";

export const ICON_SIZE = 30;

export const resultsConfig: ResultsConfig[] = [
  {
    type: ResultsCategory.FAMILIARITY,
    description:
      "Calculated based on the number of similar tasks linked to your current occupation.",
    color: "#9dcdfa",
    gradientColors: ["#1C92D2", "#F2FCFE"],
  },
  {
    type: ResultsCategory.PREFERENCE,
    description:
      "Calculated based on your preferences linked to your current occupation.",
    color: "#db9efa",
    gradientColors: ["#BB377D", "#FBD3E9"],
  },
  {
    type: ResultsCategory.PERSONALITY,
    description:
      "Calculated based on your personality traits linked to your current occupation.",
    color: "#999",
    gradientColors: ["#757F9A", "#D7DDE8"],
  },
  {
    type: ResultsCategory.BEST_FIT,
    description:
      "Calculated based on the similarities linked to your current occupations.",
    color: "#a1e3a1",
    gradientColors: ["#1D976C", "#93F9B9"],
  },
];
