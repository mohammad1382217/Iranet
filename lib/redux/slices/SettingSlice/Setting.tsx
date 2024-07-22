/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: SettingSliceState = {
  showModalDeleteDepartment: false,
  showModalDeleteAccountAdmin: false,
  showModalDisablePayment: false,
  showModalAddAccountAdmin: false,
  showModalEditAccountAdmin: false,
  disableId: 0,
  status: "idle",
};

export const SettingSlice = createSlice({
  name: "Setting",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setShowModalDeleteDepartment: (state) => {
      state.showModalDeleteDepartment = !state.showModalDeleteDepartment;
    },
    setShowModalDeleteAccountAdmin: (state) => {
      state.showModalDeleteAccountAdmin = !state.showModalDeleteAccountAdmin;
    },
    setShowModalDisablePayment: (state) => {
      state.showModalDisablePayment = !state.showModalDisablePayment;
    },
    setShowModalAddAccountAdmin: (state) => {
      state.showModalAddAccountAdmin = !state.showModalAddAccountAdmin;
    },
    setShowModalEditAccountAdmin: (state) => {
      state.showModalEditAccountAdmin = !state.showModalEditAccountAdmin;
    },
    setDisableId: (state, actions: PayloadAction<number>) => {
      state.disableId = actions.payload;
    },
  },
});

/* Types */
export interface SettingSliceState {
  showModalDeleteDepartment: boolean;
  showModalDeleteAccountAdmin: boolean;
  showModalDisablePayment: boolean;
  showModalAddAccountAdmin: boolean;
  showModalEditAccountAdmin: boolean;
  disableId: number;
  status: "idle" | "loading" | "failed";
}
