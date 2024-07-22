import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../app/api/apiConfig";

export const fetchUsersViewTicket = createAsyncThunk("users/ticket/viewTicket", async (id:string) => {
  try {
    const response = await axiosInstance.get(`/api/ticket/${id}/`);
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
