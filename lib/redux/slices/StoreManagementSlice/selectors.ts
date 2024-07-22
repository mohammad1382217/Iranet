/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectShowModalsStoreManagement = (state: ReduxState) => state.StoreManagement.showModals
export const selectStoreManagementData = (state: ReduxState) => state.StoreManagement.StoreManagementData
export const selectConfirmation = (state: ReduxState) => state.StoreManagement.confirmation
export const selectText = (state: ReduxState) => state.StoreManagement.text
export const selectGroupName = (state: ReduxState) => state.StoreManagement.groupName
export const selectStatusStoreManagement = (state: ReduxState) => state.StoreManagement.status
export const selectGroupIdAction = (state: ReduxState) => state.StoreManagement.groupIdAction
export const selectSmsSendingData = (state: ReduxState) => state.StoreManagement.smsSendingData
