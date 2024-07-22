/* Core */
import type { UploadFile } from "antd/es/upload/interface";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchAccountDataByIdThunk, fetchAccountDataThunk, validateOtpThunk } from "./thunk";

const initialState: loginSliceState = {
  phone_number: "",
  otp: "",
  isAdmin: false,
  isLoading: false,
  isLoggedIn: false,
  account: null,
  register: {
    nid: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  },
  national_card: [],
  supplementaryform: {
    default_group_name: "",
    default_phonebook_name: "",
    default_text_message: "",
  },
  store_logo: [],
  store_ad: [],
  departments: [],
  status: "idle",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phone_number = action.payload;
    },
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setRegister: (
      state,
      action: PayloadAction<{ key: keyof registers; value: string }>
    ) => {
      const { key, value } = action.payload;
      state.register[key] = value;
    },
    setNationalCard: (
      state,
      action: PayloadAction<UploadFile<unknown>[]>
    ) => {
      state.national_card = action.payload;
    },
    setDefaultOwnerNationalCard: (state) => {
      state.national_card = initialState.national_card;
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
    setStoreLogo: (state, action: PayloadAction<UploadFile<unknown>[]>) => {
      state.store_logo = action.payload;
    },
    setStoreAd: (state, action: PayloadAction<UploadFile<unknown>[]>) => {
      state.store_ad = action.payload;
    },
    setDefaultStoreLogo: (state) => {
      state.store_logo = initialState.store_logo;
    },
    setDefaultStoreAd: (state) => {
      state.store_ad = initialState.store_ad;
    },
    setDepartments: (state, action: PayloadAction<departments[]>) => {
      state.departments = action.payload;
    },
    setAccount: (state, action: PayloadAction<AccountData[]>) => {
      state.account = action.payload[0];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateOtpThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(validateOtpThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(validateOtpThunk.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(fetchAccountDataThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAccountDataThunk.fulfilled, (state, action: PayloadAction<AccountData[]>) => {
        state.isLoading = false;
        state.account = action.payload[0];
        state.isAdmin = action.payload[0].is_staff ?? false;
      })
      .addCase(fetchAccountDataThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAdmin = false;
        state.account = initialState.account;
      })
      .addCase(fetchAccountDataByIdThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAccountDataByIdThunk.fulfilled, (state, action: PayloadAction<AccountData>) => {
        state.isLoading = false;
        state.account = action.payload;
        state.isAdmin = action.payload.is_staff ?? false;
      })
      .addCase(fetchAccountDataByIdThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAdmin = false;
        state.account = initialState.account;
      });
  },
});

/* Types */
export interface loginSliceState {
  phone_number: string;
  otp: string;
  isAdmin: boolean | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  register: registers;
  account: AccountData | null;
  national_card: UploadFile<any>[];
  supplementaryform: supplementaryform;
  store_logo: UploadFile<any>[];
  store_ad: UploadFile<any>[];
  departments: departments[];
  status: "idle" | "loading" | "failed";
}

export interface registers {
  nid: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export interface supplementaryform {
  default_group_name: string;
  default_phonebook_name: string;
  default_text_message: string;
}

export interface departments {
  department_id: string;
  department_name: string;
}

export interface AccountData {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  nid: string;
  bank_number: string | null;
  birth_date: string | null;
  national_card: string | null;
  created_at: string;
  verified: boolean;
  is_staff: boolean;
  store: {
    is_fill_default_text: boolean;
    store_id: string;
    store_name: string;
    store_status: string;
  };
}
