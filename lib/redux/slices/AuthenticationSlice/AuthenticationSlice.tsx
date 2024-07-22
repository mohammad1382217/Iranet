/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type UploadFile } from "antd";

const initialState: AuthenticationSliceState = {
  national_card: [],
  showModalSeccessFullyAuthentication: false,
  status: "idle",
};

export const AuthenticationSlice = createSlice({
  name: "Authentication",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setNationalCard: (state, action: PayloadAction<UploadFile<any>[]>) => {
      state.national_card = action.payload;
    },
    setDefaultOwnerNationalCard: (state) => {
      state.national_card = initialState.national_card;
    },
    setShowModalSeccessFullyAuthentication: (state) => {
      state.showModalSeccessFullyAuthentication =
        !state.showModalSeccessFullyAuthentication;
    },
  },
});

/* Types */
export interface AuthenticationSliceState {
  national_card: UploadFile<any>[];
  showModalSeccessFullyAuthentication: boolean;
  status: "idle" | "loading" | "failed";
}
