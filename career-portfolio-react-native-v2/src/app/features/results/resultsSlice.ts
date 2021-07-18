import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UseFetchResultsResponse } from "../../../helpers/hooks/useFetchResults";

import { ResultsCategory, ResultsState } from "../../../types";

const initialState: ResultsState = {
  count: null,
  similar: null,
  missing: null,
  [ResultsCategory.FAMILIARITY]: null,
  [ResultsCategory.PREFERENCE]: null,
  [ResultsCategory.PERSONALITY]: null,
  [ResultsCategory.BEST_FIT]: null,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setRecentlyOpenedId: (state, action: PayloadAction<string>) => {
      state.recentlyOpenedId = action.payload;
    },
    saveResults: (state, action: PayloadAction<UseFetchResultsResponse>) => {
      let { count, similar, missing } = action.payload;
      count = count.slice(1).map((e) => {
        return {
          inputTitle: e[0],
          title: e[1],
          similarityScore: e[2],
          similarTasks: e[3],
          missingTasks: e[4],
          jobClassNo: e[5],
          jobClass: e[6],
          riasecScore: e[7],
          DOA: e[8],
          emerging: e[9],
          sourceJobZone: e[10],
          targetJobZone: e[11],
          preferenceScore: e[12],
          simScarcity: e[13],
          trainedInv: e[14],
          cosineSim: e[15],
          cosineSimPure: e[16],
        };
      });
      similar = similar.map((e) => {
        return {
          inputTitle: e[0],
          title: e[1],
          similarIWA: e[2],
        };
      });
      missing = missing.map((e) => {
        return {
          inputTitle: e[0],
          title: e[1],
          missingIWA: e[2],
        };
      });
      state.count = count;
      state.similar = similar;
      state.missing = missing;
      state[ResultsCategory.FAMILIARITY] = [...count]
        .sort((a, b) => b.similarTasks - a.similarTasks)
        .slice(0, 10);
      state[ResultsCategory.PREFERENCE] = [...count]
        .sort((a, b) => b.preferenceScore - a.preferenceScore)
        .slice(0, 10);
      state[ResultsCategory.PERSONALITY] = [...count]
        .sort((a, b) => b.riasecScore - a.riasecScore)
        .slice(0, 10);
      state[ResultsCategory.BEST_FIT] = [...count]
        .sort((a, b) => b.similarityScore - a.similarityScore)
        .slice(0, 10);
    },
  },
});

export const { setRecentlyOpenedId, saveResults } = resultsSlice.actions;

export default resultsSlice.reducer;
