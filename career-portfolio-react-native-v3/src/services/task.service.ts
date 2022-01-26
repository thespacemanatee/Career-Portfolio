/* eslint-disable camelcase */
import { TASK_RECOMMENDER_ENDPOINT } from "@env";
import axios from "axios";

import type { JobClass } from "../app/features/jobClass";

export const getRecommendedTasks = async (
  jobClass: JobClass,
  iwaIds: string[]
) => {
  return axios.post(TASK_RECOMMENDER_ENDPOINT, {
    user_id: "123",
    job_class: [jobClass.socCode],
    user_iwa_id_list: iwaIds,
    authentication: "ok",
  });
};
