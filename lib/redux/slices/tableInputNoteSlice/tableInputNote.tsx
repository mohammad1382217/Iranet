/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: tableInputNotesSliceState = {
  dataTable: [
    {
      key: "1",
      title: "نام",
      kind: "متن",
      limitcharacter: 16,
    },
    {
      key: "2",
      title: "نام خانوادگی",
      kind: "تاریخ",
      limitcharacter: 26,
    },

  ],
  editingKeyTable: "",
  add_title: "",
  add_kind: "",
  add_limitcharacter :null,
  status: 'idle',
}

export const tableInputNotesSlice = createSlice({
  name: 'tableInputNotes',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setEditingKeyTable: (state ,actions : PayloadAction<string>) => {
      state.editingKeyTable = actions.payload;
    },
    setAddTitle:(state ,actions : PayloadAction<string>) => {
      state.add_title = actions.payload;
    },
    setAddKind:(state ,actions : PayloadAction<string>) => {
      state.add_kind = actions.payload;
    },
    setAddLimitCharacter:(state ,actions : PayloadAction<number | null>) => {
      state.add_limitcharacter = actions.payload;
    },
    setNewData: (state ,actions : PayloadAction<dataTable[]>) => {
      state.dataTable = actions.payload;
    }
  },
})

/* Types */
export interface tableInputNotesSliceState {
  dataTable: dataTable[],
  editingKeyTable: string,
  add_title: string,
  add_kind: string,
  add_limitcharacter: number | null ,
  status: 'idle' | 'loading' | 'failed'
}
export interface dataTable {
  key: React.Key,
  title: string,
  kind: string,
  limitcharacter: number | null,
}

