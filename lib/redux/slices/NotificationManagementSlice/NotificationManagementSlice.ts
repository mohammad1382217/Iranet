/* Core */
import { createSlice } from "@reduxjs/toolkit";
import type { UploadFile } from "antd/es/upload/interface";

const initialState: NotificationManagementSliceState = {
  showModalDragUploadNotification: false,
  showModalDragUploadAd: false,
  showModalDeleteAd: false,
  file : [],
  status: "idle",
};

export const NotificationManagementSlice = createSlice({
  name: "NotificationManagement",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setShowModalDragUploadNotification: (state) => {
      state.showModalDragUploadNotification = !state.showModalDragUploadNotification;
    },
    setShowModalDragUploadAd: (state) => {
      state.showModalDragUploadAd = !state.showModalDragUploadAd;
    },
    setShowModalDeleteAd: (state) => {
      state.showModalDeleteAd = !state.showModalDeleteAd;
    },
  },
});

/* Types */
export interface NotificationManagementSliceState {
  showModalDragUploadNotification: boolean;
  showModalDragUploadAd: boolean;
  showModalDeleteAd: boolean;
  file: UploadFile<any>[];
  status: "idle" | "loading" | "failed";
}