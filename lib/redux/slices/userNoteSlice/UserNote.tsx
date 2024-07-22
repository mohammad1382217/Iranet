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
  editingKeyUserNotes: "",
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
    setEditingKeyUserNotes: (state ,actions : PayloadAction<string>) => {
      state.editingKeyUserNotes = actions.payload;
    },
  },
})

/* Types */
export interface userNoteSliceState {
  userNoteData: userNoteData[],
  editingKeyUserNotes: string,
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