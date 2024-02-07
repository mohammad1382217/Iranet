/* Instruments */
import {
  dashboardSlice,
  appSlice,
  anniversaryDialogSlice,
  notesSlice,
  tableInputNotesSlice,
  userNoteSlice,
  occasionalmessageSlice,
  ticketsSlice,
  sendReportSlice,
  SurveySlice,
  loginSlice,
  groupsSlice,
} from "./slices";

export const reducer = {
  dashboard: dashboardSlice.reducer,
  anniversaryDialog: anniversaryDialogSlice.reducer,
  groups: groupsSlice.reducer,
  notes: notesSlice.reducer,
  tableInputNote: tableInputNotesSlice.reducer,
  occasionalmessage: occasionalmessageSlice.reducer,
  userNote: userNoteSlice.reducer,
  tickets: ticketsSlice.reducer,
  sendReport: sendReportSlice.reducer,
  Survey: SurveySlice.reducer,
  app: appSlice.reducer,
  login: loginSlice.reducer,
};
