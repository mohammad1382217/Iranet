/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: anniversaryDialogSliceState = {
  searchText: "",
  searchedColumn: "",
  status: 'idle',
}

export const anniversaryDialogSlice = createSlice({
  name: 'anniversaryDialog',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSearchText: (state ,actions : PayloadAction<string>) => {
      state.searchText = actions.payload;
    },
    setSearchedColumn: (state ,actions : PayloadAction<string>) => {
      state.searchedColumn = actions.payload;
    }
  },
})

/* Types */
export interface anniversaryDialogSliceState {
  searchText : string,
  searchedColumn : string,
  status: 'idle' | 'loading' | 'failed'
}

