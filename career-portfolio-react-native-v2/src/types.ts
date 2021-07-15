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

export type ResultsViewPagerConfig = {
  type: ResultsCategory;
  color: string;
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
}

export enum ResultsType {
  IRRELEVANT = "Irrelevant",
  SIMILAR = "Similar",
  MISSING = "Missing",
}

export enum ResultsCategory {
  FAMILIARITY = "FAMILIARITY",
  PREFERENCE = "PREFERENCE",
  PERSONALITY = "PERSONALITY",
  BEST_FIT = "BEST FIT",
}

export type ResultsState = {
  count: ResultsCountData[];
  similar: ResultsSimilarData[];
  missing: ResultsMissingData[];
  status?: string;
  opened?: boolean;
};

// type ResultsLocalStorageItemObject = {
//   count: ResultsCountData[];
//   missing: ResultsBaseData[][];
//   similar: ResultsBaseData[][];
//   irrelevant: ResultsSimilarData[][];
// };

export interface ResultsLocalStorageItem {
  [id: string]: {
    date: Date;
    payload: ResultsPayload;
  };

  // [ResultsCategory.FAMILIARITY]: ResultsLocalStorageItemObject;
  // [ResultsCategory.PREFERENCE]: ResultsLocalStorageItemObject;
  // [ResultsCategory.PERSONALITY]: ResultsLocalStorageItemObject;
  // [ResultsCategory.BEST_FIT]: ResultsLocalStorageItemObject;
}
