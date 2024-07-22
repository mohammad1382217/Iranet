import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../app/api/apiConfig";

export const ConfrimListofGroupsAdmin = createAsyncThunk(
    "store/ConfirmListofGroupsAdmins",
    async ({ group_id, accessToken, is_confirm }: ConfrimListofGroupsAdminParams) => {
    // if (!accessToken) {
    //   console.error("Access token is not provided.");
    //   throw new Error("Access token is not provided.");
    // }
    

    try {
      const response = await axiosInstance.put(
        `groups/${group_id}`,
        {
        "is_confirm":is_confirm === "0" ? true : false
        }
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
interface ConfrimListofGroupsAdminParams {
  group_id: number;
  is_confirm: string;
  accessToken?: string | null;
}
