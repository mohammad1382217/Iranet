/* Core */
import { createSlice } from '@reduxjs/toolkit'

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: dashboardSliceState = {
  status: 'idle',
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
})

/* Types */
export interface dashboardSliceState {
  status: 'idle' | 'loading' | 'failed'
}
