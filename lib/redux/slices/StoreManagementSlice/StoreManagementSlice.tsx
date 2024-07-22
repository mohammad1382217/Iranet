/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchStoreManagement } from "./fetchStoreManagement";

const initialState: StoreManagementSliceState = {
  StoreManagementData: [
    {
      key: "1",
      store_name: "فروشگاه شماره 1",
      user_name: "علی علوی",
      guild: "مغازه دار",
      condition:'فعال',
      phoneNumber: "09393273968",
    },
  ],
  smsSendingData:[
    {
      key: 1,
      idSend:"12345678",
      dateSend: "1402/10/01 - 11:00",
      condition: "منتظر تایید اپراتور",
      sendMethod: "شماره",
    },
    {
      key: 2,
      idSend:"12345678",
      dateSend: "1401/01/05 - 11:00",
      condition: "تایید شده در صف ارسال",
      sendMethod: "فایل",
    },
    {
      key: 3,
      idSend:"12345678",
      dateSend: "1402/02/17 - 11:00",
      condition: "ارسال شده در انتظار گزارش",
      sendMethod: "گروه",
    },
    {
      key: 4,
      idSend:"12345678",
      dateSend: "1403/05/09 - 11:00",
      condition: "پایان یافته",
      sendMethod: "انتخاب منطقه",
    },
  ],
  showModalStoreManagement: false,
  confirmation: "",
  text: "",
  groupName: "",
  groupIdAction: "",
  status: "idle",
  showModals: {
    storeInformation: false,
    increaseValue: false,
    decreaseValue: false,
  },
};

export const StoreManagementSlice = createSlice({
  name: "StoreManagement",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setShowModalStoreManagement: (state, actions: PayloadAction<boolean>) => {
      state.showModalStoreManagement = actions.payload;
    },
    setConfirmation: (state, actions: PayloadAction<string>) => {
      state.confirmation = actions.payload;
    },
    setText: (state, actions: PayloadAction<string>) => {
      state.text = actions.payload;
    },
    setStatus: (
      state,
      actions: PayloadAction<"idle" | "loading" | "failed">
    ) => {
      state.status = actions.payload;
    },
    setGroupName: (state, actions: PayloadAction<string>) => {
      state.groupName = actions.payload;
    },
    setGroupIdAction: (state, actions: PayloadAction<string>) => {
      state.groupIdAction = actions.payload;
    },
    setShowModal: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "storeInformation":
          state.showModals.storeInformation = !state.showModals.storeInformation;
          break;
        case "decreaseValue":
          state.showModals.decreaseValue = !state.showModals.decreaseValue;
          break;
        case "increaseValue":
          state.showModals.increaseValue = !state.showModals.increaseValue;
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(
      //   fetchStoreManagement.fulfilled,
      //   (
      //     state,
      //     action: PayloadAction<{
      //       groups: StoreManagementData[];
      //       status: number;
      //     }>
      //   ) => {
      //     console.log(action.payload.groups);
      //     const sortedData = action.payload.groups.slice().sort((a, b) => {
      //       // Sort disabled users first
      //       const sortA = a.is_confirm === "0"; // true for 0, false for 1
      //       const sortB = b.is_confirm === "0"; // true for 0, false for 1

      //       if (sortA && !sortB) {
      //         return -1; // a should come before b
      //       } else if (!sortA && sortB) {
      //         return 1; // b should come before a
      //       } else {
      //         return 0; // no change in order
      //       }
      //     });

      //     state.StoreManagementData = sortedData;
      //     state.status = "idle";
      //   }
      // )
      .addCase(fetchStoreManagement.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoreManagement.rejected, (state) => {
        state.status = "failed";
      })
      // .addCase(ConfrimStoreManagement.fulfilled, (state) => {
      //   state.status = "idle";
      //   const groupIndex = state.StoreManagementData.findIndex(
      //     (group) => +group.group_id === +state.groupIdAction
      //   );
      //   if (groupIndex === -1) {
      //     console.error("Group not found in tableData");
      //     return;
      //   }
      //   const updatedIsConfrim =
      //     state.StoreManagementData[groupIndex].is_confirm === "0" ? "1" : "0";
      //   state.StoreManagementData[groupIndex].is_confirm = updatedIsConfrim;
      //   console.log("hi", updatedIsConfrim);

      //   const sortedData = state.StoreManagementData.slice().sort((a, b) => {
      //     // Sort disabled users first
      //     const sortA = a.is_confirm === "0"; // true for 0, false for 1
      //     const sortB = b.is_confirm === "0"; // true for 0, false for 1

      //     if (sortA && !sortB) {
      //       return -1; // a should come before b
      //     } else if (!sortA && sortB) {
      //       return 1; // b should come before a
      //     } else {
      //       return 0; // no change in order
      //     }
      //   });
      //   state.StoreManagementData = sortedData;
      // })
      // .addCase(ConfrimStoreManagement.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(ConfrimStoreManagement.rejected, (state) => {
      //   state.status = "failed";
      // });
  },
});

/* Types */
export interface StoreManagementSliceState {
  StoreManagementData: StoreManagementDataType[];
  smsSendingData:smsSendingDataType[];
  showModalStoreManagement: boolean;
  confirmation: string;
  groupIdAction: string;
  text: string;
  groupName: string;
  status: "idle" | "loading" | "failed";
  showModals: {
    storeInformation:boolean;
    decreaseValue:boolean;
    increaseValue:boolean;
  };
}

export interface StoreManagementDataType {
  key: string;
  store_name: string;
  user_name: string;
  guild: string;
  condition:string;
  phoneNumber:string;
}
export interface smsSendingDataType {
  key: number;
  idSend: string;
  dateSend: string;
  condition:string;
  sendMethod:string;
}
