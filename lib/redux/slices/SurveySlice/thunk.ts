import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../app/api/apiConfig";
import { addSurveyData, surveyResults } from "./SurveySlice";

export const fetchSurveyThunk = createAsyncThunk(
  "store/fetchSurvey",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("api/survey/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSurveyByIdThunk = createAsyncThunk(
  "store/fetchSurveyById",
  async (Id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`api/survey/${Id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAddSurveyThunk = createAsyncThunk(
  "store/fetchAddSurvey",
  async (survey: addSurveyData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/survey/", survey);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSurveyOptionsThunk = createAsyncThunk(
  "store/fetchSurveyOptions",
  async ({ uuid }: { uuid: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `api/survey/${uuid}/survey_option/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAddSurveyOptionsThunk = createAsyncThunk(
  "store/fetchAddSurveyOptions",
  async (
    { uuid, title }: { uuid: string; title: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `api/survey/${uuid}/survey_option/`,
        { title }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchDeleteSurveyOptionsThunk = createAsyncThunk(
  "store/fetchDeleteSurveyOptions",
  async ({ uuid, id }: { uuid: string; id: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `api/survey/${uuid}/survey_option/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSurveyResultThunk = createAsyncThunk<
  surveyResults,
  { uuid: string }
>("store/fetchSurveyResult", async ({ uuid }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`api/survey/${uuid}/result/`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchSurveyMemberThunk = createAsyncThunk(
  "store/fetchSurveyMemberThunk",
  async ({ uuid }: { uuid: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `api/survey/${uuid}/survey_member/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSurveyStopThunk = createAsyncThunk(
  "store/fetchSurveyStopThunk",
  async (
    { uuid }: { uuid: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `api/survey/${uuid}/stop/`,
        {force_stop : true}
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
