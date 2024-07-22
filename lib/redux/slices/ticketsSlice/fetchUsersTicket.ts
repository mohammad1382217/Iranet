import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../app/api/apiConfig";

export const fetchUsersTicket = createAsyncThunk("users/ticket", async () => {
  try {
    const response = await axiosInstance.get("/api/ticket/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      console.error("Error fetching data:", error);
    }
  }
});
