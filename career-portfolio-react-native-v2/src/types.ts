import Colors from "./helpers/config/color";

/* eslint-disable camelcase */
export type FontWeight =
  | "bold"
  | "semiBold"
  | "extraBold"
  | "extraLight"
  | "light"
  | "medium"
  | "regular";

export type PagerViewOnPageScrollEventData = {
  position: number;
  offset: number;
};

export type ResultsConfig = {
  type: ResultsCategory;
  description: string;
  color: string;
  gradientColors: string[];
};

export type TaskObject = {
  task: string;
  taskId: number;
  IWA_Title: string;
  task_type: string;
  deleted?: boolean;
};

export enum TaskType {
  CORE = "core",
  SUPPLEMENTARY = "supplementary",
  LIFE = "life",
}

export interface ResultsBaseData {
  inputTitle: string;
  title: string;
}

export interface ResultsCountData extends ResultsBaseData {
  similarityScore: number;
  similarTasks: number;
  missingTasks: number;
  jobClassNo: number;
  jobClass: string;
  riasecScore: number;
  DOA: number;
  emerging: number;
  sourceJobZone: number;
  targetJobZone: number;
  preferenceScore: number;
  simScarcity: number;
  trainedInv: number;
  cosineSim: number;
  cosineSimPure: number;
}

export interface ResultsSimilarData extends ResultsBaseData {
  similarIWA?: string;
}

export interface ResultsMissingData extends ResultsBaseData {
  missingIWA?: string;
}

export interface ResultsPayload {
  input_title: string;
  onet_title: string;
  title_id: string;
  task_list: TaskObject[];
  date: number;
}

export enum ResultsType {
  NOT_RELEVANT = "Not Relevant",
  SIMILAR = "Similar",
  MISSING = "Missing",
}

export enum ResultsCategory {
  FAMILIARITY = "FAMILIARITY",
  PREFERENCE = "PREFERENCE",
  PERSONALITY = "PERSONALITY",
  BEST_FIT = "BEST FIT",
}

export type ResultsPieChartData = {
  tasks: string[];
  color: Colors;
};

export type ResultsScores = {
  similarTasksScore: number;
  preferenceScore: number;
  riasecScore: number;
  similarityScore: number;
};

export type ResultsState = {
  count: ResultsCountData[];
  similar: ResultsSimilarData[];
  missing: ResultsMissingData[];
  [ResultsCategory.FAMILIARITY]: ResultsCountData[];
  [ResultsCategory.PREFERENCE]: ResultsCountData[];
  [ResultsCategory.PERSONALITY]: ResultsCountData[];
  [ResultsCategory.BEST_FIT]: ResultsCountData[];
  recentlyOpenedId?: string;
};

export type ResultsLocalStorageItem = {
  payload: ResultsPayload;
  editedDate?: number;
};

export type ResultsLocalStorage = {
  [id: string]: ResultsLocalStorageItem;
};
