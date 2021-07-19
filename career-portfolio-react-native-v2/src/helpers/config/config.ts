import { ResultsCategory, ResultsConfig } from "../../types";

export const PROGRESS_HEADER_HEIGHT = 60;

export const ICON_SIZE = 30;

export const resultsConfig: ResultsConfig[] = [
  {
    type: ResultsCategory.FAMILIARITY,
    color: "#9dcdfa",
  },
  {
    type: ResultsCategory.PREFERENCE,
    color: "#db9efa",
  },
  {
    type: ResultsCategory.PERSONALITY,
    color: "#999",
  },
  {
    type: ResultsCategory.BEST_FIT,
    color: "#a1e3a1",
  },
];
