/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchGroup } from "./fetchGroups";
import { editGroup } from "./editGroup";
import { deleteGroup } from "./deleteGroup";
import type { UploadFile } from "antd/es/upload/interface";
import { patchField } from "./patchField";

const initialState: groupsSliceState = {
  groups: [],
  addContacts: {
    uuid: "057228a5-bdd5-427a-9eba-a9b785268805",
    available_field: {
      name: "نام",
      empty_field1: null,
      empty_field3: null,
      empty_field5: null,
    },
  },
  selectoptions: ["بستی فروش ها", "نام گروه"],
  selectedoption: "نام گروه",
  actionId: 0,
  DefaultGroupId: 0,
  titilegroup: "",
  file: [],
  textmessage: "",
  status: "loading",
  showModals: {
    addGroup: false,
    deleteGroup: false,
    editGroup: false,
    successfulladdGroup: false,
    Groupfield: false,
    addContactsMethod: false,
    deleteField: false,
    addContactsGroup: false,
    successfullContactsGroup: false,
    addContactsSingleFirstdata: false,
    addContactsSingleFulldata: false,
    successfullContactsSingle: false,
  },
  Groupcheckbox: [
    { name: "نام", checked: false, type: "string", disabled: false },
    { name: "نام خانوادگی", checked: false, type: "string", disabled: false },
    {
      name: "نام و نام خانوادگی",
      checked: false,
      type: "string",
      disabled: false,
    },
    { name: "تاریخ تولد", checked: false, type: "date", disabled: false },
    { name: "سن", checked: false, type: "number", disabled: false },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
    { name: "فیلد پیشفرض", checked: false, type: "string", disabled: true },
  ],
  Groupfieldcheckbox: [
    { name: "empty_field1", value: "", checked: false },
    { name: "empty_field2", value: "", checked: false },
    { name: "empty_field3", value: "", checked: false },
    { name: "empty_field4", value: "", checked: false },
    { name: "empty_field5", value: "", checked: false },
    { name: "empty_field6", value: "", checked: false },
    { name: "empty_field7", value: "", checked: false },
    { name: "empty_field8", value: "", checked: false },
    { name: "empty_field9", value: "", checked: false },
    { name: "empty_field10", value: "", checked: false },
    { name: "empty_field11", value: "", checked: false },
    { name: "empty_field12", value: "", checked: false },
    { name: "empty_field13", value: "", checked: false },
    { name: "empty_field14", value: "", checked: false },
    { name: "empty_field15", value: "", checked: false },
    { name: "empty_field16", value: "", checked: false },
  ],
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setGroups: (state, actions: PayloadAction<groups[]>) => {
      state.groups = actions.payload;
    },
    setAddContacts: (state, actions: PayloadAction<addContacts>) => {
      state.addContacts = actions.payload;
    },
    setSelectedOption: (state, actions: PayloadAction<string>) => {
      state.selectedoption = actions.payload;
    },
    setTitileGroup: (state, actions: PayloadAction<string>) => {
      state.titilegroup = actions.payload;
    },
    settextmessage: (state, actions: PayloadAction<string>) => {
      state.textmessage = actions.payload;
    },
    setActionId: (state, action: PayloadAction<number>) => {
      state.actionId = action.payload;
    },
    setShowModal: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "addGroup":
          state.showModals.addGroup = !state.showModals.addGroup;
          break;
        case "deleteGroup":
          state.showModals.deleteGroup = !state.showModals.deleteGroup;
          break;
        case "editGroup":
          state.showModals.editGroup = !state.showModals.editGroup;
          break;
        case "Groupfield":
          state.showModals.Groupfield = !state.showModals.Groupfield;
          break;
        case "successfulladdGroup":
          state.showModals.successfulladdGroup =
            !state.showModals.successfulladdGroup;
          break;
        case "addContactsMethod":
          state.showModals.addContactsMethod =
            !state.showModals.addContactsMethod;
          break;
        case "addContactsGroup":
          state.showModals.addContactsGroup =
            !state.showModals.addContactsGroup;
          break;
        case "successfullContactsGroup":
          state.showModals.successfullContactsGroup =
            !state.showModals.successfullContactsGroup;
          break;
        case "addContactsSingleFirstdata":
          state.showModals.addContactsSingleFirstdata =
            !state.showModals.addContactsSingleFirstdata;
          break;
        case "addContactsSingleFulldata":
          state.showModals.addContactsSingleFulldata =
            !state.showModals.addContactsSingleFulldata;
          break;
        case "successfullContactsSingle":
          state.showModals.successfullContactsSingle =
            !state.showModals.successfullContactsSingle;
          break;
      }
    },
    setGroupcheckbox: (state, action: PayloadAction<GroupcheckboxType[]>) => {
      state.Groupcheckbox = action.payload;
    },
    setGroupfieldcheckbox: (
      state,
      action: PayloadAction<GroupfieldcheckboxType[]>
    ) => {
      state.Groupfieldcheckbox = action.payload;
    },
    setGroupcheckboxes: (state) => {
      const groupIndex = state.groups.findIndex(
        (group) => group.id === state.actionId
      );
      if (state.groups[groupIndex].available_field.name) {
        state.Groupcheckbox[0].checked = true;
      }
      if (state.groups[groupIndex].available_field.last_name) {
        state.Groupcheckbox[1].checked = true;
      }
      if (state.groups[groupIndex].available_field.full_name) {
        state.Groupcheckbox[2].checked = true;
      }
      if (state.groups[groupIndex].available_field.birth_date) {
        state.Groupcheckbox[3].checked = true;
      }
      if (state.groups[groupIndex].available_field.age) {
        state.Groupcheckbox[4].checked = true;
      }
      /// set field
      if (state.groups[groupIndex].available_field.empty_field1) {
        state.Groupfieldcheckbox[0].value =
          state.groups[groupIndex].available_field.empty_field1;
        state.Groupfieldcheckbox[0].checked = true;
      }
      if (state.groups[groupIndex].available_field.empty_field2) {
        state.Groupfieldcheckbox[1].value =
          state.groups[groupIndex].available_field.empty_field2;
        state.Groupfieldcheckbox[1].checked = true;
      }
      if (state.groups[groupIndex].available_field.empty_field3) {
        state.Groupfieldcheckbox[2].value =
          state.groups[groupIndex].available_field.empty_field3;
        state.Groupfieldcheckbox[2].checked = true;
      }
      if (state.groups[groupIndex].available_field.empty_field4) {
        state.Groupfieldcheckbox[3].value =
          state.groups[groupIndex].available_field.empty_field4;
        state.Groupfieldcheckbox[3].checked = true;
      }
      if (state.groups[groupIndex].available_field.empty_field5) {
        state.Groupfieldcheckbox[4].value =
          state.groups[groupIndex].available_field.empty_field5;
        state.Groupfieldcheckbox[4].checked = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchGroup.fulfilled,
        (state, action: PayloadAction<groups[]>) => {
          state.groups = action.payload;
          state.DefaultGroupId = action.payload[0].id;
          // console.log(action.payload);
          state.status = "idle";
        }
      )
      .addCase(fetchGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGroup.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(editGroup.fulfilled, (state) => {
        state.status = "idle";
        const groupIndex = state.groups.findIndex(
          (group) => +group.id === +state.actionId
        );

        if (groupIndex === -1) {
          console.error("Group not found in tableData");
          return;
        }

        const updatedIsActive =
          state.groups[groupIndex].active === false ? true : false;

        state.groups[groupIndex].active = updatedIsActive;
      })
      .addCase(editGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editGroup.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(patchField.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(patchField.pending, (state) => {
        state.status = "loading";
      })
      .addCase(patchField.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteGroup.fulfilled, (state) => {
        state.status = "idle";
        const groupIndex = state.groups.findIndex(
          (group) => group.id === +state.actionId
        );

        if (groupIndex === -1) {
          console.error("Group not found in state.groups");
          return;
        }
        state.showModals.deleteGroup = false;
        state.groups.splice(groupIndex, 1);
      })
      .addCase(deleteGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteGroup.rejected, (state) => {
        state.status = "failed";
      });
  },
});

/* Types */
export interface available_field {
  name?: string | null;
  last_name?: string | null;
  age?: string | null;
  birth_date?: string | null;
  empty_field1?: string | null;
  empty_field2?: string | null;
  empty_field3?: string | null;
  empty_field4?: string | null;
  empty_field5?: string | null;
  full_name?: string | null;
}
export interface addContacts {
  uuid: string;
  available_field: available_field;
}
export interface groupsSliceState {
  groups: groups[];
  addContacts: addContacts;
  selectoptions: string[];
  selectedoption: string;
  actionId: number;
  DefaultGroupId: number;
  titilegroup: string;
  file: UploadFile[];
  textmessage: string;
  status: "idle" | "loading" | "failed";
  showModals: {
    addGroup: boolean;
    deleteGroup: boolean;
    editGroup: boolean;
    successfulladdGroup: boolean;
    Groupfield: boolean;
    addContactsMethod: boolean;
    deleteField: boolean;
    addContactsGroup: boolean;
    successfullContactsGroup: boolean;
    addContactsSingleFirstdata: boolean;
    addContactsSingleFulldata: boolean;
    successfullContactsSingle: boolean;
  };
  Groupcheckbox: GroupcheckboxType[];
  Groupfieldcheckbox: GroupfieldcheckboxType[];
}
export interface GroupcheckboxType {
  name: string;
  checked: true | false;
  disabled: true | false;
  type: "string" | "number" | "date";
}
export interface GroupfieldcheckboxType {
  name: string;
  value: string;
  checked: true | false;
}
export interface groups {
  id: number;
  title: string;
  status: string;
  member_count: number;
  message: string;
  available_field: {
    name: string;
    last_name: string;
    age: string;
    birth_date: string;
    empty_field1: string;
    empty_field2: string;
    empty_field3: string;
    empty_field4: string;
    empty_field5: string;
    full_name: string;
  };
  active: true | false;
}
