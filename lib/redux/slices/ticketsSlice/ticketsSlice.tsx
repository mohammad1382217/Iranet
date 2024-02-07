/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: ticketsSliceState = {
  ticketsData: [
    {
      key: "1",
      ticketname: "تیکت شمارۀ 1",
      date: "1400/00/00",
      recognizecode:12345,
      Condition:["پاسخ داده شده و در حال بررسی"],
    }, {
      key: "2",
      ticketname: "تیکت شمارۀ 2",
      date: "1401/01/02",
      recognizecode:88845,
      Condition:["بسته شده"],
    },
     {
      key: "3",
      ticketname: "تیکت شمارۀ 3",
      date: "1401/01/01",
      recognizecode:88845,
      Condition:["پاسخ داده شده"],
    }
  ],
  selectoptions: ["دپارتمان 2", "دپارتمان 1"],
  ticketform: {
    Attachment: ""
  },
  selectedoption: "",
  subjectTicket: '',
  description:'',
  searchText: "",
  searchedColumn: "",
  status: 'idle',
}

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSearchText: (state ,actions : PayloadAction<string>) => {
      state.searchText = actions.payload;
    },
    setSearchedColumn: (state ,actions : PayloadAction<string>) => {
      state.searchedColumn = actions.payload;
    },
    setNewData: (state ,actions : PayloadAction<ticketsData[]>) => {
      state.ticketsData = actions.payload;
    },
    setTicketForm: (
      state,
      action: PayloadAction<{
        key: keyof ticketform;
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      state.ticketform[key] = value;
    },
    setSelectedOption: (state ,actions : PayloadAction<string>) => {
      state.selectedoption = actions.payload;
    },
    setSubjectTicket: (state ,actions : PayloadAction<string>) => {
      state.subjectTicket = actions.payload;
    },
    setdescription: (state ,actions : PayloadAction<string>) => {
      state.description = actions.payload;
    },
  },
})

/* Types */
export interface ticketsSliceState {
  ticketsData: ticketsData[],
  selectoptions: string[],
  ticketform: ticketform,
  selectedoption: string,
  subjectTicket:string,
  description:string,
  searchText : string,
  searchedColumn: string,
  status: 'idle' | 'loading' | 'failed'
}
export interface ticketsData {
  key: React.Key,
  ticketname: string,
  recognizecode: number,
  date: string,
  Condition: string[],
}

export interface ticketform {
  Attachment: string,
}
