import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../app/api/apiConfig";

export const fetchLotteryGroupsThunk = createAsyncThunk(
  "store/fetchLotteryGroups",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("api/lottery/group/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchLotterySurveyThunk = createAsyncThunk(
  "store/fetchLotterySurvey",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("api/lottery/survey/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);