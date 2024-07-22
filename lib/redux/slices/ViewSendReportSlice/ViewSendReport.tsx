/* Core */
import { createSlice } from "@reduxjs/toolkit";
// import { fetchStoreManagement } from "./fetchViewSendReport";

const initialState: ViewSendReportSliceState = {
  ViewSendReportData: [{
    key: "1",
    dateSend: "1402/10/01 - 11:00",
    dateRequest: "1402/10/01 - 11:00",
    sendMethod: "شماره",
    price: "100000",
    successPresent:80
  },
  {
    key: "2", 
    dateSend: "1402/10/01 - 11:00",
    dateRequest: "1402/10/01 - 11:00",
    sendMethod: "شماره",
    price: "100000",
    successPresent:100
  },
  {
    key: "3", 
    dateSend: "1402/10/01 - 11:00",
    dateRequest: "1402/10/01 - 11:00",
    sendMethod: "شماره",
    price: "100000",
    successPresent:10
  }],
  // showModalStoreManagement: false,
  // confirmation: "",
  // text: "",
  // groupName: "",
  // groupIdAction: "",
  status: "idle",
};

export const ViewSendReportSlice = createSlice({
  name: "ViewSendReport",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // setShowModalStoreManagement: (state, actions: PayloadAction<boolean>) => {
    //   state.showModalStoreManagement = actions.payload;
    // },
    // setConfirmation: (state, actions: PayloadAction<string>) => {
    //   state.confirmation = actions.payload;
    // },
    // setText: (state, actions: PayloadAction<string>) => {
    //   state.text = actions.payload;
    // },
    // setStatus: (
    //   state,
    //   actions: PayloadAction<"idle" | "loading" | "failed">
    // ) => {
    //   state.status = actions.payload;
    // },
    // setGroupName: (state, actions: PayloadAction<string>) => {
    //   state.groupName = actions.payload;
    // },
    // setGroupIdAction: (state, actions: PayloadAction<string>) => {
    //   state.groupIdAction = actions.payload;
    // },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(
  //       fetchStoreManagement.fulfilled,
  //       (
  //         state,
  //         action: PayloadAction<{ groups: StoreManagementData[]; status: number }>
  //       ) => {
  //         console.log(action.payload.groups)
  //         const sortedData = action.payload.groups.slice().sort((a, b) => {
  //           // Sort disabled users first
  //           const sortA = a.is_confirm === "0"; // true for 0, false for 1
  //           const sortB = b.is_confirm === "0"; // true for 0, false for 1
          
  //           if (sortA && !sortB) {
  //             return -1; // a should come before b
  //           } else if (!sortA && sortB) {
  //             return 1; // b should come before a
  //           } else {
  //             return 0; // no change in order
  //           }
  //         });
          
  //         state.ViewSendReportData = sortedData ;
  //         state.status = "idle";
  //       }
  //     )
  //     .addCase(fetchStoreManagement.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(fetchStoreManagement.rejected, (state) => {
  //       state.status = "failed";
  //     })
  //     .addCase(
  //       ConfrimStoreManagement.fulfilled,
  //       (
  //         state,
  //       ) => {
  //         state.status = "idle";
  //         const groupIndex = state.ViewSendReportData.findIndex(
  //           (group) => +group.group_id === +state.groupIdAction
  //         );
  //         if (groupIndex === -1) {
  //           console.error("Group not found in tableData");
  //           return;
  //         }
  //         const updatedIsConfrim =
  //         state.ViewSendReportData[groupIndex].is_confirm === "0" ? "1" : "0";
  //         state.ViewSendReportData[groupIndex].is_confirm = updatedIsConfrim
  //         console.log('hi',updatedIsConfrim);

  //         const sortedData = state.ViewSendReportData.slice().sort((a, b) => {
  //           // Sort disabled users first
  //           const sortA = a.is_confirm === "0"; // true for 0, false for 1
  //           const sortB = b.is_confirm === "0"; // true for 0, false for 1
          
  //           if (sortA && !sortB) {
  //             return -1; // a should come before b
  //           } else if (!sortA && sortB) {
  //             return 1; // b should come before a
  //           } else {
  //             return 0; // no change in order
  //           }
  //         });
  //         state.ViewSendReportData = sortedData ;
  //       }
  //     )
  //     .addCase(ConfrimStoreManagement.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(ConfrimStoreManagement.rejected, (state) => {
  //       state.status = "failed";
  //     });
  // },
});

/* Types */
export interface ViewSendReportSliceState {
  ViewSendReportData: ViewSendReportData[];
  // showModalStoreManagement: boolean;
  // confirmation: string;
  // groupIdAction: string;
  // text: string;
  // groupName: string;
  status: "idle" | "loading" | "failed";
}

export interface ViewSendReportData {
  key: React.Key;
  dateRequest: string;
  dateSend: string;
  sendMethod: string;
  price: string;
  successPresent: number;
}
