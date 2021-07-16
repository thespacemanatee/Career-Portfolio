import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { ResultsState } from "../../../types";

const initialState: ResultsState = {
  count: null,
  similar: null,
  missing: null,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setRecentlyOpened: (state, action: PayloadAction<string>) => {
      state.recentlyOpened = action.payload;
    },
    saveResults: (state, action: PayloadAction<ResultsState>) => {
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
    },
  },
});

export const { setRecentlyOpened, saveResults } = resultsSlice.actions;

export default resultsSlice.reducer;
