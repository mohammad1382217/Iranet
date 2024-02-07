/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: appSliceState = {
  isMenuOpen: false,
  showModal: false,
  showModalResultSurvey: false,
  showModalSendReport: false,
  activeStep: 0,
  activeCheckBoxDirectPayment: 0, 
  isFirstStep: false,
  isLastStep: false,
  accordionOpen: 1,
  openRight: false,
  openLeft: false,
  NotePhone: ["09123456789", "09423456789", "09123956789"],
  selectedTxtFile: "",
  status: "idle",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setIsMenuOpen: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setCloseMenuOpen: (state) => {
      state.isMenuOpen = initialState.isMenuOpen;
    },
    setShowModal: (state) => {
      state.showModal = !state.showModal;
    },
    setShowModalResultSurvey: (state) => {
      state.showModalResultSurvey = !state.showModalResultSurvey;
    },
    setShowModalSendReport: (state) => {
      state.showModalSendReport = !state.showModalSendReport;
    },
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
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
    setOpenRight: (state, action: PayloadAction<boolean>) => {
      state.openRight = action.payload;
    },
    setOpenLeft: (state, action: PayloadAction<boolean>) => {
      state.openLeft = action.payload;
    },
    setNotephone: (state, action: PayloadAction<string[]>) => {
      state.NotePhone = action.payload;
    },
    setSelectedTxtfile: (state, action: PayloadAction<string>) => {
      state.selectedTxtFile = action.payload;
    },
  },
});

/* Types */
export interface appSliceState {
  isMenuOpen: boolean;
  showModal: boolean;
  showModalResultSurvey: boolean;
  showModalSendReport: boolean;
  activeStep: number;
  activeCheckBoxDirectPayment: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  accordionOpen: number;
  openRight: boolean;
  openLeft: boolean;
  NotePhone: string[];
  selectedTxtFile: string;
  status: "idle" | "loading" | "failed";
}
