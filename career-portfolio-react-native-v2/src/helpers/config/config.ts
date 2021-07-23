import { ResultsCategory, ResultsConfig } from "../../types";

export const ICON_SIZE = 30;

export const resultsConfig: ResultsConfig[] = [
  {
    type: ResultsCategory.FAMILIARITY,
    description:
      "Calculated based on the number of similar tasks linked to your current occupation.",
    color: "#9dcdfa",
  },
  {
    type: ResultsCategory.PREFERENCE,
    description:
      "Calculated based on your preferences linked to your current occupation.",
    color: "#db9efa",
  },
  {
    type: ResultsCategory.PERSONALITY,
    description:
      "Calculated based on your personality traits linked to your current occupation.",
    color: "#999",
  },
  {
    type: ResultsCategory.BEST_FIT,
    description:
      "Calculated based on the similarities linked to your current occupations.",
    color: "#a1e3a1",
  },
];
