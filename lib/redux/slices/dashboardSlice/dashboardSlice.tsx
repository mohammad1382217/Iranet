/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: dashboardSliceState = {
  searchText: "",
  searchedColumn: "",
  status: 'idle',
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
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
export interface dashboardSliceState {
  searchText : string,
  searchedColumn : string,
  status: 'idle' | 'loading' | 'failed'
}
