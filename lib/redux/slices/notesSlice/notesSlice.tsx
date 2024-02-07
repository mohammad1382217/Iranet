/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: notesSliceState = {
  notesData: [
    {
      key: "1",
      groupName: "عنوان گروه شماره 1",
      groups: "نام گروه",
      numberUsers: 158,
    },
    {
      key: "2",
      groupName: "عنوان گروه شماره 2",
      groups: "نام گروه",
      numberUsers: 58,
    },

  ],
  deleteId: 1,
  selectedItems: [],
  searchText: "",
  searchedColumn: "",
  status: 'idle',
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setNewData: (state,action : PayloadAction<notesData[]>) => {
      state.notesData = action.payload
    },
    setNotesDeleteId: (state,action : PayloadAction<number>) => {
      state.deleteId = action.payload
    },
    setSelectedItems: (state,action : PayloadAction<string[]>) => {
      state.selectedItems = action.payload
    },
    setSearchText: (state ,actions : PayloadAction<string>) => {
      state.searchText = actions.payload;
    },
    setSearchedColumn: (state ,actions : PayloadAction<string>) => {
      state.searchedColumn = actions.payload;
    }
  },
})

/* Types */
export interface notesSliceState {
  notesData: notesData[],
  deleteId: number,
  selectedItems: string[],
  searchText : string,
  searchedColumn : string,
  status: 'idle' | 'loading' | 'failed'
}
export interface notesData {
  key: React.Key,
  groupName: string,
  groups: string,
  numberUsers: number,
}

