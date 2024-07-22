/* Core */
import { createSlice } from '@reduxjs/toolkit'

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: anniversaryDialogSliceState = {
  status: 'idle',
}

export const anniversaryDialogSlice = createSlice({
  name: 'anniversaryDialog',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
})

/* Types */
export interface anniversaryDialogSliceState {
  status: 'idle' | 'loading' | 'failed'
}

