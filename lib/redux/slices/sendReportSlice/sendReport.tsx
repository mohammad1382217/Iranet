/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: sendReportSliceState = {
  sendReportData: [
    {
      key: 1,
      senddate: "1400/00/00",
      recognize_send_code:12345,
      final_price: "200000",
      Condition: ["ارسال شده"],

      SenderNumber: "09393289899",
      SendMethod: 'پیامک',
      Groups: 'نام گروه',
      NumberPages: 3,
      TextMessage: 'متن پیام ممتن پیام متن پیام ',
      // TextMessage: 'متن پیام متن پیام متن پیام متن پیام متن پیام متن پیام متن پیام متن پیام ',
      Descrioption: 'توضیحات',
      SucsessSend: 12,
      FaildSend: 92,
      BackPrice: '920000',
      
    },
    {
      key: 2,
      senddate: "1400/00/00",
      recognize_send_code:124543355,
      final_price: "400000",
      Condition: ["لغو شده"],
      SenderNumber: "09393289899",
      SendMethod: 'پیامک',
      Groups: 'نام گروه',
      NumberPages: 3,
      TextMessage: 'متن پیام متن پیام متن پیام متن پیام متن پیام متن پیام متن پیام متن پیام ',
      Descrioption: 'توضیحات',
      SucsessSend: 12,
      FaildSend: 92,
      BackPrice: '920000',
    }
  ],
  // completeSendReportData: [ 
  //     {
  //       key: 1,
  //       senddate: "1400/00/00",
  //       recognize_send_code:12345,
  //       final_price: "200000",
  //       Condition:["ارسال شده"],
  //     },
  //     {
  //       key: 2,
  //       senddate: "1400/00/00",
  //       recognize_send_code:1245455,
  //       final_price: "400000",
  //       Condition:["لغو شده"],
  //     }
    
  // ],
  searchText: "",
  searchedColumn: "",
  status: 'idle',
}

export const sendReportSlice = createSlice({
  name: 'sendReport',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSearchText: (state ,actions : PayloadAction<string>) => {
      state.searchText = actions.payload;
    },
    setSearchedColumn: (state ,actions : PayloadAction<string>) => {
      state.searchedColumn = actions.payload;
    },
  },
})

/* Types */
export interface sendReportSliceState {
  sendReportData: sendReportData[],
  // completeSendReportData:completeSendReportData[],
  searchText : string,
  searchedColumn: string,
  status: 'idle' | 'loading' | 'failed'
}
export interface sendReportData {
  key: React.Key,
  senddate: string,
  recognize_send_code: number,
  final_price: string,
  BackPrice: string,
  Condition: string[],
  SenderNumber: string,
  SendMethod: string,
  Groups: string,
  TextMessage: string,
  Descrioption: string,
  NumberPages: number,
  SucsessSend: number,
  FaildSend: number,
  
}
// export interface completeSendReportData {
//   key: React.Key,
//   senddate: string,
//   recognize_send_code: number,
//   final_price: string,
//   Condition: string[],
// }

