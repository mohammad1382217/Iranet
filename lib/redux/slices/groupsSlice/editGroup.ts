import axios from "axios";
import { groups } from "./groupsSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../app/api/apiConfig";

export const editGroup = createAsyncThunk(
  "groups/editGroup",
  async ({ group_id, updatedData }: editGroupParams) => {
    // if (!localStorage.getItem('accessToken')) {
    //   console.error("Access token is not provided.");
    //   throw new Error("Access token is not provided.");
    // }
    try {
      const response = await axiosInstance.patch(
        `api/store/group/${group_id}/`,
        updatedData
      );
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
interface editGroupParams {
  group_id: number;
  updatedData: any;
  accessToken?: string | null;
}
