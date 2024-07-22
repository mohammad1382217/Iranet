import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../app/api/apiConfig";
import { setCookie } from "../../../../app/api/apiConfig";
import { registers } from "./loginSlice";

export const validateOtpThunk = createAsyncThunk(
  "auth/validateOtp",
  async (
    { phone_number, otp }: { phone_number: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("api/core/otp-valid/", {
        phone_number,
        otp,
      });
      setCookie("accessToken", response.data.token, 7, true);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAddAccountThunk = createAsyncThunk(
  "auth/fetchAddAccount",
  async (account: registers, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/core/", account);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAccountDataThunk = createAsyncThunk(
  "auth/fetchAccountData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("api/core/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAccountDataByIdThunk = createAsyncThunk(
  "auth/fetchAccountDataById",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`api/core/${id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
