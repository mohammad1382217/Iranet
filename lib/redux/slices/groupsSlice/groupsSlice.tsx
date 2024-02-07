/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: groupsSliceState = {
  GroupsData: [
    {
      key: "1",
      groupName: "عنوان گروه شماره 1",
      Notebooks: "نام دفترچه تلفن",
      numberUsers: 158,
      textmessage: "متن پیامک 1",
      disable: false,
    },
    {
      key: "2",
      groupName: "عنوان گروه شماره 2",
      Notebooks: "نام دفترچه تلفن",
      numberUsers: 58,
      textmessage: "متن پیامک 2",
      disable: false,
    },
  ],
  deleteId: 1,
  lenghtTextArea: 0,
  selectoptions: ["بستی فروش ها", "نام دفترچه"],
  selectedoption: "نام دفترچه",
  titilegroup: "",
  textmessage: "",
  searchText: "",
  searchedColumn: "",
  status: "idle",
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSearchText: (state, actions: PayloadAction<string>) => {
      state.searchText = actions.payload;
    },
    setSearchedColumn: (state, actions: PayloadAction<string>) => {
      state.searchedColumn = actions.payload;
    },
    setNewData: (state, actions: PayloadAction<GroupsData[]>) => {
      state.GroupsData = actions.payload;
    },
    setSelectedOption: (state, actions: PayloadAction<string>) => {
      state.selectedoption = actions.payload;
    },
    setlenghtTextArea: (state, actions: PayloadAction<number>) => {
      state.lenghtTextArea = actions.payload;
    },
    setDeleteId: (state, actions: PayloadAction<number>) => {
      state.deleteId = actions.payload;
    },
    setTitileGroup: (state, actions: PayloadAction<string>) => {
      state.titilegroup = actions.payload;
    },
    settextmessage: (state, actions: PayloadAction<string>) => {
      state.textmessage = actions.payload;
    },
  },
});

/* Types */
export interface groupsSliceState {
  GroupsData: GroupsData[];
  selectoptions: string[];
  deleteId: number;
  lenghtTextArea: number;
  selectedoption: string;
  titilegroup: string;
  textmessage: string;
  searchText: string;
  searchedColumn: string;
  status: "idle" | "loading" | "failed";
}
export interface GroupsData {
  key: React.Key;
  groupName: string;
  Notebooks: string;
  numberUsers: number;
  textmessage: string;
  disable: boolean;
}
