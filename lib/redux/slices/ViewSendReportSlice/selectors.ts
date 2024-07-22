/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectViewSendReportData = (state: ReduxState) => state.ViewSendReport.ViewSendReportData
// export const selectConfirmation = (state: ReduxState) => state.ViewSendReport.confirmation
// export const selectText = (state: ReduxState) => state.ViewSendReport.text
// export const selectGroupName = (state: ReduxState) => state.ViewSendReport.groupName
export const selectStatusViewSendReport = (state: ReduxState) => state.ViewSendReport.status
// export const selectGroupIdAction = (state: ReduxState) => state.ViewSendReport.groupIdAction