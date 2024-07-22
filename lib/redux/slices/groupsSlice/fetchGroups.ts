import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../app/api/apiConfig";

export const fetchGroup = createAsyncThunk(
  "store/groups",
  async ({accessToken}: FetchGroupParams, { signal }) => {
    
    // if (!accessToken) {
    //   console.error("Access token is not provided.");
    //   throw new Error("Access token is not provided.");
    // }
    

    const controller = new AbortController();
    signal.addEventListener("abort", () => controller.abort());
    try {
      
      const response = await axiosInstance.get("api/store/group/", {
        signal: controller.signal,
      });
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
interface FetchGroupParams {
  group_id: string;
  accessToken?: string | null;
}
