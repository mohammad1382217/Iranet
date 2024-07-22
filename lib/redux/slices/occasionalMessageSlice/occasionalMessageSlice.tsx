/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: occasionalmessageSliceState = {
  occasionalMessageData: [
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
      users:["بستی فروش ها", "نام گروه 1"],
      textmessage: "لورم  سلامتی یپسوم متن ساختگی  یپسوم متن ساختگیصنعت "
    },
  ],
  selectoptions: ["بستی فروش ها", "نام گروه 1","نام گروه 2"],
  selectedoption: [],
  titleMessage: '',
  textmessage:'',
  senddate: "",
  status: 'idle',
}

export const occasionalmessageSlice = createSlice({
  name: 'occasionalmessage',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setNewData: (state ,actions : PayloadAction<occasionalMessageData[]>) => {
      state.occasionalMessageData = actions.payload;
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
    setsenddata: (state ,actions : PayloadAction<string>) => {
      state.senddate = actions.payload;
    },
  },
})

/* Types */
export interface occasionalmessageSliceState {
  occasionalMessageData: occasionalMessageData[],
  selectoptions:string[],
  selectedoption:string[] | string,
  titleMessage:string,
  textmessage:string,
  senddate:string,
  status: 'idle' | 'loading' | 'failed'
}
export interface occasionalMessageData {
  key: React.Key,
  titlemessage: string,
  senddate: string,
  users: string[],
  textmessage:string
}

