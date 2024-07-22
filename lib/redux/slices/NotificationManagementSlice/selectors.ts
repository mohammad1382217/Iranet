/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectShowModalDragUploadNotification = (state: ReduxState) => state.NotificationManagement.showModalDragUploadNotification
export const selectShowModalDragUploadAd = (state: ReduxState) => state.NotificationManagement.showModalDragUploadAd
export const selectShowModalDeleteAd = (state: ReduxState) => state.NotificationManagement.showModalDeleteAd
export const selectFile = (state: ReduxState) => state.NotificationManagement.file

