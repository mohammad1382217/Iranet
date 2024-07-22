/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchAddStoreThunk, fetchStoreThunk } from "./thunk";

const initialState: appSliceState = {
  isMenuOpen: false,
  isLoadingStore: false,
  store: [],
  storeAccount: {
    id: 0,
    status: "",
    name: "",
    address: "",
    postal_code: "",
    phone: "",
    guild: {
      id: 0,
      name: "",
    },
    welcome_message: "",
    logo: "",
    advertising_file: "",
  },
  showModals: {
    showModalOrigin: false,
    showModalChargeAccount: false,
    showModalWelcome: false,
    showModalLotteryGroups: false,
    showModalResultSurvey: false,
    showModalSendReport: false,
    showModalSeccessFullyRegister: false,
    showModalSendToGroup: false,
    showModalSendOccasionalMassage: false,
    showModalSendByNumber: false,
    showModalSendByFile: false,
    showModalSendByRegion: false,
    showModalSendByPostalCode: false,
    showModalInformation: false,
    showModalMethodeLottery: false,
    showModalLotteryResultSurvey: false,
    showModalConfirmSurvey: false,
  },
  activeCheckBoxDirectPayment: 0,
  isFirstStep: false,
  isLastStep: false,
  accordionOpen: 1,
  underAccordionOpen: 1,
  openRight: false,
  openLeft: false,
  selectedItems: "",
  NotePhone: ["09123456789", "09423456789", "09123956789"],
  selectedTxtFile: "",
  searchTableText: "",
  searchedTableColumn: "",
  editingKeyTable: "",
  startDate: null,
  endDate: null,
  status: "idle",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setStore: (state, action: PayloadAction<store[]>) => {
      state.store = action.payload;
    },
    setIsMenuOpen: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setCloseMenuOpen: (state) => {
      state.isMenuOpen = initialState.isMenuOpen;
    },
    setShowModals: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "showModalOrigin":
          state.showModals.showModalOrigin = !state.showModals.showModalOrigin;
          break;
        case "showModalResultSurvey":
          state.showModals.showModalResultSurvey =
            !state.showModals.showModalResultSurvey;
          break;
        case "showModalWelcome":
          state.showModals.showModalWelcome =
            !state.showModals.showModalWelcome;
          break;
        case "showModalSendReport":
          state.showModals.showModalSendReport =
            !state.showModals.showModalSendReport;
          break;
        case "showModalSeccessFullyRegister":
          state.showModals.showModalSeccessFullyRegister =
            !state.showModals.showModalSeccessFullyRegister;
          break;
        case "showModalChargeAccount":
          state.showModals.showModalChargeAccount =
            !state.showModals.showModalChargeAccount;
          break;
        case "showModalSendToGroup":
          state.showModals.showModalSendToGroup =
            !state.showModals.showModalSendToGroup;
          break;
        case "showModalSendOccasionalMassage":
          state.showModals.showModalSendOccasionalMassage =
            !state.showModals.showModalSendOccasionalMassage;
          break;
        case "showModalSendByNumber":
          state.showModals.showModalSendByNumber =
            !state.showModals.showModalSendByNumber;
          break;
        case "showModalSendByFile":
          state.showModals.showModalSendByFile =
            !state.showModals.showModalSendByFile;
          break;
        case "showModalSendByRegion":
          state.showModals.showModalSendByRegion =
            !state.showModals.showModalSendByRegion;
          break;
        case "showModalSendByPostalCode":
          state.showModals.showModalSendByPostalCode =
            !state.showModals.showModalSendByPostalCode;
          break;
        case "showModalInformation":
          state.showModals.showModalInformation =
            !state.showModals.showModalInformation;
          break;
        case "showModalMethodeLottery":
          state.showModals.showModalMethodeLottery =
            !state.showModals.showModalMethodeLottery;
          break;
        case "showModalLotteryResultSurvey":
          state.showModals.showModalLotteryResultSurvey =
            !state.showModals.showModalLotteryResultSurvey;
          break;
        case "showModalConfirmSurvey":
          state.showModals.showModalConfirmSurvey =
            !state.showModals.showModalConfirmSurvey;
        case "showModalLotteryGroups":
          state.showModals.showModalLotteryGroups =
            !state.showModals.showModalLotteryGroups;
          break;
      }
    },
    setActiveCheckBoxDirectPayment: (state, action: PayloadAction<number>) => {
      state.activeCheckBoxDirectPayment = action.payload;
    },
    setIsLastStep: (state, action: PayloadAction<boolean>) => {
      state.isLastStep = action.payload;
    },
    setIsFirstStep: (state, action: PayloadAction<boolean>) => {
      state.isFirstStep = action.payload;
    },
    setAccordionOpen: (state, action: PayloadAction<number>) => {
      state.accordionOpen = action.payload;
    },
    setUnderAccordionOpen: (state, action: PayloadAction<number>) => {
      state.underAccordionOpen = action.payload;
    },
    setOpenRight: (state, action: PayloadAction<boolean>) => {
      state.openRight = action.payload;
    },
    setOpenLeft: (state, action: PayloadAction<boolean>) => {
      state.openLeft = action.payload;
    },
    setSelectedItems: (state, action: PayloadAction<string>) => {
      state.selectedItems = action.payload;
    },
    setNotephone: (state, action: PayloadAction<string[]>) => {
      state.NotePhone = action.payload;
    },
    setSelectedTxtfile: (state, action: PayloadAction<string>) => {
      state.selectedTxtFile = action.payload;
    },
    // search at all
    setSearchTableText: (state, actions: PayloadAction<string>) => {
      state.searchTableText = actions.payload;
    },
    setSearchedTableColumn: (state, actions: PayloadAction<string>) => {
      state.searchedTableColumn = actions.payload;
    },
    setEditingKeyTable: (state, actions: PayloadAction<string>) => {
      state.editingKeyTable = actions.payload;
    },
    // filter
    setStartDateFilters: (state, actions: PayloadAction<string | null>) => {
      state.startDate = actions.payload;
    },
    setEndDateFilters: (state, actions: PayloadAction<string | null>) => {
      state.endDate = actions.payload;
    },
    clearDateFilters: (state) => {
      state.startDate = null;
      state.endDate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreThunk.pending, (state) => {
        state.isLoadingStore = true;
      })
      .addCase(
        fetchStoreThunk.fulfilled,
        (state, actions: PayloadAction<storeAccount[]>) => {
          state.isLoadingStore = false;
          state.storeAccount = actions.payload[0];
        }
      )
      .addCase(fetchStoreThunk.rejected, (state) => {
        state.isLoadingStore = false;
        state.store = initialState.store;
      });
  },
});

/* Types */
export interface appSliceState {
  isMenuOpen: boolean;
  store: store[];
  storeAccount: storeAccount;
  isLoadingStore: boolean;
  showModals: showModalsType;
  activeCheckBoxDirectPayment: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  accordionOpen: number;
  underAccordionOpen: number;
  openRight: boolean;
  openLeft: boolean;
  selectedItems: string | string[];
  NotePhone: string[];
  selectedTxtFile: string;
  searchTableText: string;
  searchedTableColumn: string;
  editingKeyTable: string;
  startDate: string | null;
  endDate: string | null;
  status: "idle" | "loading" | "failed";
}

interface showModalsType {
  showModalOrigin: boolean;
  showModalWelcome: boolean;
  showModalResultSurvey: boolean;
  showModalLotteryGroups: boolean;
  showModalSendReport: boolean;
  showModalSeccessFullyRegister: boolean;
  showModalChargeAccount: boolean;
  showModalSendToGroup: boolean;
  showModalSendOccasionalMassage: boolean;
  showModalSendByNumber: boolean;
  showModalSendByFile: boolean;
  showModalSendByRegion: boolean;
  showModalSendByPostalCode: boolean;
  showModalInformation: boolean;
  showModalMethodeLottery: boolean;
  showModalLotteryResultSurvey: boolean;
  showModalConfirmSurvey: boolean;
}

export interface store {
  name: string;
  address: string;
  postal_code: string;
  phone: string;
  guild: string | null;
}

export type storeAccount = {
  id: number;
  status: string;
  name: string;
  address: string;
  postal_code: string;
  phone: string;
  guild: {
    id: number;
    name: string;
  };
  welcome_message: string;
  logo: string;
  advertising_file: string;
};
