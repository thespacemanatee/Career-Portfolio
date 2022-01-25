import type { JobClass } from "../app/features/jobClass";

export type RootStackParamList = {
  "Job Class": undefined;
  Tasks: {
    selectedJobClass: JobClass;
  };
};

export { AppNavigator } from "./AppNavigator";
