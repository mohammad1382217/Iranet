/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: occasionalmessageSliceState = {
  occasionalmessageData: [
    {
      key: 1,
      titlemessage: "پیام مناسبتی عید نوروز",
      senddate: "1402/01/01",
      users:["بستی فروش ها"],
      textmessage: "لورم  یپسوم متن ساختگی  یپسوم متن ساختگی ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت "
    }, {
      key: 2,
      titlemessage: "پیام مناسبتی عید ",
      senddate: "1400/08/10",
      users:["بستی فروش ها", "نام دفترچه 1"],
      textmessage: "لورم  سلامتی یپسوم متن ساختگی  یپسوم متن ساختگیصنعت "
    },
  ],
  selectoptions: ["بستی فروش ها", "نام دفترچه 1","نام دفترچه 2"],
  selectedoption: [],
  titleMessage: '',
  textmessage:'',
  lenghtTextArea: 0,
  searchText: "",
  senddate: "",
  searchedColumn: "",
  status: 'idle',
}

export const occasionalmessageSlice = createSlice({
  name: 'occasionalmessage',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSearchText: (state ,actions : PayloadAction<string>) => {
      state.searchText = actions.payload;
    },
    setSearchedColumn: (state ,actions : PayloadAction<string>) => {
      state.searchedColumn = actions.payload;
    },
    setNewData: (state ,actions : PayloadAction<occasionalmessageData[]>) => {
      state.occasionalmessageData = actions.payload;
    },
    setSelectedOption: (state ,actions : PayloadAction<string[]>) => {
      state.selectedoption = actions.payload;
    },
    setTitleMessage: (state ,actions : PayloadAction<string>) => {
      state.titleMessage = actions.payload;
    },
    settextmessage: (state ,actions : PayloadAction<string>) => {
      state.textmessage = actions.payload;
    },
    setLenghtTextArea: (state ,actions : PayloadAction<number>) => {
      state.lenghtTextArea = actions.payload;
    },
    setsenddata: (state ,actions : PayloadAction<string>) => {
      state.senddate = actions.payload;
    },
  },
})

/* Types */
export interface occasionalmessageSliceState {
  occasionalmessageData: occasionalmessageData[],
  selectoptions:string[],
  selectedoption:string[],
  titleMessage:string,
  textmessage:string,
  lenghtTextArea: number,
  searchText : string,
  senddate:string,
  searchedColumn: string,
  status: 'idle' | 'loading' | 'failed'
}
export interface occasionalmessageData {
  key: React.Key,
  titlemessage: string,
  senddate: string,
  users: string[],
  textmessage:string
}

