/* eslint-disable camelcase */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import {
  ResultsCountData,
  ResultsMissingData,
  ResultsPayload,
  ResultsSimilarData,
} from "../../../types";

export const fetchResults = createAsyncThunk(
  "results/fetchResults",
  async (data: ResultsPayload) => {
    const response = await axios({
      method: "post",
      url: "https://rjiu5d34rj.execute-api.ap-southeast-1.amazonaws.com/test/post-json",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });

    const { onet_title, user_id, count, similar, missing } = response.data;

    const responseData: ResultsState = {
      count: JSON.parse(count.replace(/\bNaN\b/g, "null")),
      similar: JSON.parse(similar.replace(/\bNaN\b/g, "null")),
      missing: JSON.parse(missing.replace(/\bNaN\b/g, "null")),
    };

    return responseData;
  }
);

interface ResultsState {
  count: ResultsCountData[];
  similar: ResultsSimilarData[];
  missing: ResultsMissingData[];
}

const initialState: ResultsState = {
  count: null,
  similar: null,
  missing: null,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchResults.fulfilled,
      (state, action: PayloadAction<ResultsState>) => {
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
          };
        });
        similar = similar.map((e) => {
          return {
            inputTitle: e[0],
            title: e[1],
            similarityScore: e[2],
            similarTasks: e[3],
            missingTasks: e[4],
            similarIWA: e[5],
          };
        });
        missing = missing.map((e) => {
          return {
            inputTitle: e[0],
            title: e[1],
            similarityScore: e[2],
            similarTasks: e[3],
            missingTasks: e[4],
            missingIWA: e[5],
          };
        });
        state.count = count;
        state.similar = similar;
        state.missing = missing;
      }
    );
  },
});

export default resultsSlice.reducer;
