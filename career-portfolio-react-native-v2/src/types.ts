/* eslint-disable camelcase */
export interface PagerViewOnPageScrollEventData {
  position: number;
  offset: number;
}

export interface ResultsViewPagerConfig {
  type: ResultsCategory;
  color: string;
}

interface ResultsBaseData {
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

export interface TaskObject {
  task: string;
  taskId: number;
  IWA_Title: string;
  task_type: string;
  deleted?: boolean;
}

export interface ResultsPayload {
  input_title: string;
  onet_title: string;
  title_id: string;
  task_list: TaskObject[];
}

export enum TaskType {
  CORE = "core",
  SUPPLEMENTARY = "supplementary",
  LIFE = "life",
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
