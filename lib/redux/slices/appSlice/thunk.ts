import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../app/api/apiConfig";
import type { store } from "./appSlice";
import type { texts } from "../../../../app/(users)/users/Registeration/page";

export const fetchAddStoreThunk = createAsyncThunk(
  "users/fetchAddStore",
  async (store: store, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/store/", store);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchStoreThunk = createAsyncThunk(
  "users/fetchStore",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("api/store/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchStoreTextsThunk = createAsyncThunk(
  "users/fetchStoreTexts",
  async (texts: texts, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("api/store/texts/", texts);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
