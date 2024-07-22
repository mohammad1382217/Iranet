/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: ListofGroupsAdminSliceState = {
  ListofGroupsAdminData: [
    {
      key: 0,
      group_name: "عنوان گروه شماره 1",
      disabledUser:true,
      store_name: "فروشگاه شماره 1",
      text_message_Group:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است",
      condition: "در انتظار تایید",
      numberUsers:21,
      is_confirm: "0",
    },
    {
      key: 1,
      group_name: "عنوان گروه شماره 2",
      disabledUser:false,
      store_name: "فروشگاه شماره 2",
      text_message_Group:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است",
      condition: "در انتظار تایید",
      numberUsers:22,
      is_confirm: "0",
    },
  ],
  showModalListofGroupsAdmin: false,
  confirmation: "",
  text: "",
  groupName: "",
  groupIdAction: "",
  status: "idle",
};

export const ListofGroupsAdminSlice = createSlice({
  name: "ListofGroupsAdmin",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setShowModalListofGroupsAdmin: (state, actions: PayloadAction<boolean>) => {
      state.showModalListofGroupsAdmin = actions.payload;
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
  },
});

/* Types */
export interface ListofGroupsAdminSliceState {
  ListofGroupsAdminData: ListofGroupsAdminDataType[];
  showModalListofGroupsAdmin: boolean;
  confirmation: string;
  groupIdAction: string;
  text: string;
  groupName: string;
  status: "idle" | "loading" | "failed";
}

export interface ListofGroupsAdminDataType {
  key: number;
  disabledUser:boolean;
  group_name: string;
  store_name: string;
  text_message_Group: string;
  condition: string;
  numberUsers:number;
  is_confirm: "0" | "1";
}
