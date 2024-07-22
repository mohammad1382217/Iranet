import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../app/api/apiConfig";

export const deleteGroup = createAsyncThunk(
  "groups/deleteGroup",
  async ({ group_id }: deleteGroupParams) => {
    // if (!localStorage.getItem('accessToken')) {
    //   console.error("Access token is not provided.");
    //   throw new Error("Access token is not provided.");
    // }
    

    try {
      const response = await axiosInstance.delete(`api/store/group/${group_id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.error("Error fetching data:", error);
      }
    }
  }
);

// Types
interface deleteGroupParams {
  group_id: number;
  accessToken?: string | null;
}
