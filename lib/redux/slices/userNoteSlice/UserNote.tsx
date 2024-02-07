/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: userNoteSliceState = {
  userNoteData: [
    {
      key: "1",
      firstName: "علی",
      lastName: "عزیزی",
      birthdate: "1400/00/00",
      job: 'نجار',
      phoneNumber:"093932373968",
    },
    {
      key: "2",
      firstName: "جواد",
      lastName: "زعفرانی",
      birthdate: "1400/00/00",
      job: 'نجار',
      phoneNumber:"093932373968",
    },
  ],
  editingKey: "",
  searchText: "",
  searchedColumn: "",
  status: 'idle',
}

export const userNoteSlice = createSlice({
  name: 'userNote',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setNewData: (state ,actions : PayloadAction<userNoteData[]>) => {
      state.userNoteData = actions.payload;
    },
    setEditingKey: (state ,actions : PayloadAction<string>) => {
      state.editingKey = actions.payload;
    },
    setSearchText: (state ,actions : PayloadAction<string>) => {
      state.searchText = actions.payload;
    },
    setSearchedColumn: (state ,actions : PayloadAction<string>) => {
      state.searchedColumn = actions.payload;
    },
  },
})

/* Types */
export interface userNoteSliceState {
  userNoteData: userNoteData[],
  editingKey: string,
  searchText : string,
  searchedColumn : string,
  status: 'idle' | 'loading' | 'failed'
}
export interface userNoteData {
  key: string,
  firstName: string,
  lastName: string,
  birthdate:string ,
  job: string,
  phoneNumber: string,
}

