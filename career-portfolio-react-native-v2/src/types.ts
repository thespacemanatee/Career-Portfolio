export interface PagerViewOnPageScrollEventData {
  position: number;
  offset: number;
}

export interface ResultsCountData {
  inputTitle: string;
  title: string;
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
}

export interface ResultsSimilarData {
  inputTitle: string;
  title: string;
  similarityScore: number;
  similarTasks: number;
  missingTasks: number;
  similarIWA: string;
}

export interface ResultsMissingData {
  inputTitle: string;
  title: string;
  similarityScore: number;
  similarTasks: number;
  missingTasks: number;
  missingIWA: string;
}
