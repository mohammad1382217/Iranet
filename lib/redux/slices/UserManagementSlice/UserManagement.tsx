/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type UploadFile } from "antd";

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: UserManagementSliceState = {
  UserManagementData: [
    {
      key: 1,
      name: "نام 1",
      family: "احمدی",
      nationalCode: "0123456789",
      phoneNumber: "09123456789",
      Auth: "تایید شده",
    },
    {
      key: 2,
      name: "نام 2",
      family: "احمدی",
      nationalCode: "0123456789",
      phoneNumber: "09123456789",
      Auth: "در انتظار تایید",
    },
    {
      key: 3,
      name: "نام 3",
      family: "احمدی",
      nationalCode: "0123456789",
      phoneNumber: "09123456789",
      Auth: "عدم تایید",
    },
  ],
  AuthenticationData: [
    {
      key: 1,
      title: "شماره کارت بانکی",
      details: "603712345678998",
      condition: "در انتظار تایید",
      evidenceCinfrim: "تایید",
    },
    {
      key: 2,
      title: "تصویر کارت ملی",
      details: "مشاهده",
      condition: "تایید شده",
      evidenceCinfrim: "تایید",
    },
    {
      key: 3,
      title: "تاریخ تولد",
      details: "احمدی",
      condition: "در انتظار تایید",
      evidenceCinfrim: "عدم تایید",
    },
  ],
  EntryHistory: [
    {
      key: "1",
      date: "1401/01/01",
      hour: "12:21’",
    },
    {
      key: "2",
      date: "1401/01/01",
      hour: "12:21’",
    },
    {
      key: "3",
      date: "1401/01/01",
      hour: "12:21’",
    },
    {
      key: "4",
      date: "1401/01/01",
      hour: "12:21’",
    },
  ],
  ticketsData: [
    {
      key: "1",
      date: "1400/00/00",
      recognizecode: 12345,
      department: "مالی",
      condition: "پاسخ داده شده و در حال بررسی",
    },
    {
      key: "2",
      date: "1401/01/02",
      recognizecode: 88845,
      department: "مالی",
      condition: "بسته شده",
    },
    {
      key: "3",
      date: "1401/01/01",
      recognizecode: 88845,
      department: "مالی",
      condition: "پاسخ داده شده",
    },
    {
      key: "4",
      date: "1401/01/01",
      recognizecode: 88845,
      department: "مالی",
      condition: "در انتظار پاسخ",
    },
    {
      key: "5",
      date: "1401/01/01",
      recognizecode: 88845,
      department: "مالی",
      condition: "پاسخ داده شده",
    },
    {
      key: "6",
      date: "1401/01/01",
      recognizecode: 88845,
      department: "مالی",
      condition: "در انتظار پاسخ",
    },
    {
      key: "7",
      date: "1401/01/01",
      recognizecode: 88845,
      department: "مالی",
      condition: "پاسخ داده شده",
    },
  ],
  showModals: {
    upload: false,
    InformationUser: false,
    birthdayUser: false,
    CardUser: false,
    entryHistory: false,
    DrrageModal: false,
  },
  file: [],
  status: "idle",
};

export const UserManagementSlice = createSlice({
  name: "UserManagement",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setShowModal: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "upload":
          state.showModals.upload = !state.showModals.upload;
          break;
        case "InformationUser":
          state.showModals.InformationUser = !state.showModals.InformationUser;
          break;
        case "birthdayUser":
          state.showModals.birthdayUser = !state.showModals.birthdayUser;
          break;
        case "CardUser":
          state.showModals.CardUser = !state.showModals.CardUser;
          break;
        case "DrrageModal":
          state.showModals.DrrageModal = !state.showModals.DrrageModal;
          break;
        case "entryHistory":
          state.showModals.entryHistory = !state.showModals.entryHistory;
          break;
      }
    },
  },
});

/* Types */
export interface UserManagementSliceState {
  UserManagementData: UserManagementData[];
  AuthenticationData: AuthenticationData[];
  EntryHistory: EntryHistory[];
  ticketsData: ticketsDataType[];
  file: UploadFile<any>[];
  showModals: {
    upload: boolean;
    InformationUser: boolean;
    birthdayUser: boolean;
    CardUser: boolean;
    entryHistory: boolean;
    DrrageModal: boolean;
  };
  status: "idle" | "loading" | "failed";
}

export interface UserManagementData {
  key: React.Key;
  name: string;
  family: string;
  nationalCode: string;
  phoneNumber: string;
  Auth: string;
}
export interface AuthenticationData {
  key: React.Key;
  title: string;
  details: string;
  condition: string;
  evidenceCinfrim: string;
}
export interface ticketsDataType {
  key: React.Key;
  date: string;
  recognizecode: number;
  department: string;
  condition: string;
}
export interface EntryHistory {
  key: React.Key;
  date: string;
  hour: string;
}
