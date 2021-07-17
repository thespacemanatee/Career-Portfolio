import { ResultsCategory, ResultsViewPagerConfig } from "../../types";

export const PROGRESS_HEADER_HEIGHT = 60;

export const ICON_SIZE = 30;

export const pagerConfig: ResultsViewPagerConfig[] = [
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
