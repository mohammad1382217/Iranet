/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { DataType } from '../../../../app/(store)/Survey/page';

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: SurveySliceState = {
  SurveyDatum: [
    {
      key: 1,
      survayTitle: "نظر سنجی عید نوروز",
      date: "1400/10/10",
      surveyStatus: "متوقف شده",
    },
    {
      key: 2,
      survayTitle: "عنوان نظرسنجی شماره 3",
      date: "1400/10/20",
      surveyStatus: "در جریان",
    },
    {
      key: 3,
      survayTitle: "عنوان نظرسنجی شماره 8",
      date: "1402/05/01",
      surveyStatus: "پایان زمان",
    },
    {
      key: 4,
      survayTitle: "عنوان نظرسنجی مناسبت شماره 4",
      date: "1402/04/30",
      surveyStatus: "در صف",
    },
  ],
  SurveyData: {
    key: "",
    survayTitle: "",
    date: "",
    surveyStatus: "",
  },
  editingId: 0,
  showModalParticipants: false,
  searchText: "",
  searchedColumn: "",
  status: 'idle',
}

export const SurveySlice = createSlice({
  name: 'Survey',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSurveyDatum: (state, actions : PayloadAction<DataType[]>) => {
      state.SurveyDatum = actions.payload;
    },
    setSurveyData: (state, actions : PayloadAction<DataType>) => {
      state.SurveyData = actions.payload;
    },
    setSurveyDataKey: (state, actions : PayloadAction<{key : keyof DataType, value: string}>) => {
      const { key, value } = actions.payload;
      state.SurveyData[key] = value;
    },
    setUpdateSurveyDatum: (state, actions : PayloadAction<{index : number, modify: DataType}>) => {
      const {index , modify} = actions.payload;
      state.SurveyDatum[index] = modify;
    },
    setShowModalParticipants : (state) => {
      state.showModalParticipants = !state.showModalParticipants;
    },
    setEditingId: (state, actions : PayloadAction<number>) => {
      state.editingId = actions.payload;
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
export interface SurveySliceState {
  SurveyDatum: DataType[],
  SurveyData: DataType,
  editingId: number,
  showModalParticipants: boolean,
  searchText : string,
  searchedColumn: string,
  status: 'idle' | 'loading' | 'failed'
}

