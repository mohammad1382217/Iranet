/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: loginSliceState = {
  login: {
    store_name: "",
    store_phone: "",
    store_address: "",
    store_post_code: "",
    store_password: "",
    store_department: "",
    owner_name: "",
    owner_nid: "",
    owner_birthdate: "",
    owner_phone: "",
  },
  submitInfo: {
    owner_nid: "",
    store_password: "",
  },
  supplementaryform: {
    default_group: "",
    default_phonebook: "",
    store_logo: "",
    store_ad: "",
  },
  status: "idle",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{ key: keyof logins; value: string }>
    ) => {
      const { key, value } = action.payload;
      state.login[key] = value;
    },
    setSubmitInfo: (
      state,
      action: PayloadAction<{ key: keyof submitInfo; value: string }>
    ) => {
      const { key, value } = action.payload;
      state.submitInfo[key] = value;
    },
    setSupplementaryForm: (
      state,
      action: PayloadAction<{
        key: keyof supplementaryform;
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      state.supplementaryform[key] = value;
    },
  },
});

/* Types */
export interface loginSliceState {
  login: logins;
  submitInfo: submitInfo;
  supplementaryform: supplementaryform;
  status: "idle" | "loading" | "failed";
}

export interface logins {
  store_name: string;
  store_phone: string;
  store_address: string;
  store_post_code: string;
  store_password: string;
  store_department: string;
  owner_name: string;
  owner_nid: string;
  owner_birthdate: string;
  owner_phone: string;
}

export interface submitInfo {
  owner_nid: string;
  store_password: string;
}

export interface supplementaryform {
  default_group: string;
  default_phonebook: string;
  store_logo: string;
  store_ad: string;
}