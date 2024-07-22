import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchLotteryGroupsThunk, fetchLotterySurveyThunk } from "./thunk";

const initialState: LotterySliceState = {
  lotteryGroups: [],
  lotterySurvey: [],
  isLotteryLoading: false,
  status: "idle",
};

export const lotterySlice = createSlice({
  name: "lottery",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLotteryGroups: (state, action: PayloadAction<lotteryGroups[]>) => {
      state.lotteryGroups = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLotteryGroupsThunk.pending, (state) => {
        state.isLotteryLoading = true;
      })
      .addCase(
        fetchLotteryGroupsThunk.fulfilled,
        (state, action: PayloadAction<lotteryGroups[]>) => {
          state.isLotteryLoading = false;
          state.lotteryGroups = action.payload;
        }
      )
      .addCase(fetchLotteryGroupsThunk.rejected, (state) => {
        state.isLotteryLoading = false;
      })
      .addCase(fetchLotterySurveyThunk.pending, (state) => {
        state.isLotteryLoading = true;
      })
      .addCase(
        fetchLotterySurveyThunk.fulfilled,
        (state, action: PayloadAction<lotteryGroups[]>) => {
          state.isLotteryLoading = false;
          state.lotteryGroups = action.payload;
        }
      )
      .addCase(fetchLotterySurveyThunk.rejected, (state) => {
        state.isLotteryLoading = false;
      });
  },
});

export interface LotterySliceState {
  lotteryGroups: lotteryGroups[];
  lotterySurvey: lotteryGroups[];
  isLotteryLoading: boolean;
  status: "idle" | "loading" | "failed";
}

export type lotteryGroups = {
  id: number;
  title: string;
  winner_count: number;
  created_at: string;
};
