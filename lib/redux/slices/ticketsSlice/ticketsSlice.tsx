/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchUsersTicket } from "./fetchUsersTicket";
import { fetchUsersViewTicket } from "./fetchUsersviewTicket";

const initialState: ticketsSliceState = {
  ticketsUsersData: [],
  viewTicketsUsersChat: {
    id: 0,
    code: "0",
    title: "",
    description: "",
    file1: null,
    file2: null,
    file3: null,
    department: "",
    status: "",
    created_at: "",
    ticket_messages: [
      {
        sender: 0,
        message: "",
        file1: "",
        file2: "",
        file3: null,
        created_at: "",
      },
    ],
  },
  status: "idle",
};

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setNewData: (state, actions: PayloadAction<ticketsUsersDataType[]>) => {
      state.ticketsUsersData = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUsersTicket.fulfilled,
        (state, action: PayloadAction<ticketsUsersDataResponsType[]>) => {
          const data = action.payload as ticketsUsersDataResponsType[];
          console.log(data);
          let newdata = [] as ticketsUsersDataType[];
          data.forEach((element, index) => {
            newdata.push({
              key: index,
              ...element,
            });
          });
          state.ticketsUsersData = newdata;
          state.status = "idle";
        }
      )
      .addCase(fetchUsersTicket.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsersTicket.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(
        fetchUsersViewTicket.fulfilled,
        (state, action: PayloadAction<viewTicketDataType>) => {
          state.viewTicketsUsersChat = {
            id: 0,
            code: "0",
            title: "",
            description: "",
            file1: null,
            file2: null,
            file3: null,
            department: "",
            status: "",
            created_at: "",
            ticket_messages: [
              {
                sender: 0,
                message: "",
                file1: "",
                file2: "",
                file3: null,
                created_at: "",
              },
            ],
          };
          state.viewTicketsUsersChat = action.payload;
          state.status = "idle";
        }
      )
      .addCase(fetchUsersViewTicket.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsersViewTicket.rejected, (state) => {
        state.status = "failed";
      });
  },
});

/* Types */
export interface ticketsSliceState {
  ticketsUsersData: ticketsUsersDataType[];
  viewTicketsUsersChat: viewTicketDataType;
  status: "idle" | "loading" | "failed";
}
export interface ticketsUsersDataType {
  key: number;
  id: number;
  code: number;
  title: string;
  description: string;
  file1: string | null;
  file2: string | null;
  file3: string | null;
  department: string;
  status: string;
  created_at: string;
}
export interface ticketsUsersDataResponsType {
  id: number;
  code: number;
  title: string;
  description: string;
  file1: string | null;
  file2: string | null;
  file3: string | null;
  department: string;
  status: string;
  created_at: string;
}
export interface viewTicketDataType {
  id: number;
  code: string;
  title: string;
  description: string;
  file1: string | null;
  file2: string | null;
  file3: string | null;
  department: string;
  status: string;
  created_at: string;
  ticket_messages: ticket_messagesType[];
}
interface ticket_messagesType {
  sender: number;
  message: string;
  file1: string | null;
  file2: string | null;
  file3: string | null;
  created_at: string;
}
