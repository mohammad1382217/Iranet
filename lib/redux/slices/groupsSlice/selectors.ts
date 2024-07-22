/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGroups = (state: ReduxState) => state.groups.groups
export const selectAddContacts = (state: ReduxState) => state.groups.addContacts
export const selectGroupOpations = (state: ReduxState) => state.groups.selectoptions
export const selectedGroupOpation = (state: ReduxState) => state.groups.selectedoption
export const selectInputTitileGroup = (state: ReduxState) => state.groups.titilegroup
export const selectInputTextMessage = (state: ReduxState) => state.groups.textmessage
export const selectStatusGroup = (state: ReduxState) => state.groups.status
export const selectActionId = (state: ReduxState) => state.groups.actionId
export const selectDefaultGroupId = (state: ReduxState) => state.groups.DefaultGroupId
export const selectShowModalsGroups = (state: ReduxState) => state.groups.showModals
export const selectFileGruop = (state: ReduxState) => state.groups.file


export const selectGroupcheckbox = (state: ReduxState) => state.groups.Groupcheckbox
export const selectGroupfieldcheckbox = (state: ReduxState) => state.groups.Groupfieldcheckbox
