/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectshowModalListofGroupsAdmin = (state: ReduxState) => state.ListofGroupsAdmin.showModalListofGroupsAdmin
export const selectListofGroupsAdminData = (state: ReduxState) => state.ListofGroupsAdmin.ListofGroupsAdminData
// export const selectText = (state: ReduxState) => state.ListofGroupsAdmin.text
// export const selectGroupName = (state: ReduxState) => state.ListofGroupsAdmin.groupName
// export const selectStatusListofGroupsAdmin = (state: ReduxState) => state.ListofGroupsAdmin.status
// export const selectGroupIdAction = (state: ReduxState) => state.ListofGroupsAdmin.groupIdAction