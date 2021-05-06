import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// omit imports and state

export const fetchResults = createAsyncThunk(
  "results/fetchResults",
  async (data) => {
    const response = await axios({
      method: "post",
      url:
        "https://rjiu5d34rj.execute-api.ap-southeast-1.amazonaws.com/test/post-json",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });
    const { onet_title, user_id, count, similar, missing } = response.data;

    const responseData = {
      count: JSON.parse(count),
      similar: JSON.parse(similar),
      missing: JSON.parse(missing),
    };

    return responseData;
  }
);

const initialState = {
  count: null,
  similar: null,
  missing: null,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    // omit reducer cases
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        let { count, similar, missing } = action.payload;
        count = count.map((e) => {
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
        state.status = "idle";
      });
  },
});

export default resultsSlice.reducer;