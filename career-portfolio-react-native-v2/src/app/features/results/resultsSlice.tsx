/* eslint-disable camelcase */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import type {
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
      count: JSON.parse(count),
      similar: JSON.parse(similar),
      missing: JSON.parse(missing),
    };

    console.log(responseData);

    return responseData;
  }
);

interface ResultsState {
  count: ResultsCountData[];
  similar: ResultsSimilarData[];
  missing: ResultsMissingData[];
  status?: string;
  opened?: boolean;
}

const initialState: ResultsState = {
  count: null,
  similar: null,
  missing: null,
  status: "idle",
  opened: false,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    markAsRead: (state) => {
      state.opened = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResults.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      fetchResults.fulfilled,
      (state, action: PayloadAction<ResultsState>) => {
        state.status = "fulfilled";
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
      }
    );
    builder.addCase(fetchResults.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const { markAsRead } = resultsSlice.actions;

export default resultsSlice.reducer;
