/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGroupsData = (state: ReduxState) => state.groups.GroupsData
export const selectGroupsSearchText = (state: ReduxState) => state.groups.searchText
export const selectGroupsSearchedColumn = (state: ReduxState) => state.groups.searchedColumn
export const selectGroupOpations = (state: ReduxState) => state.groups.selectoptions
export const selectedGroupOpation = (state: ReduxState) => state.groups.selectedoption
export const selectedDeleteId = (state: ReduxState) => state.groups.deleteId
export const selectedLengthTextarea = (state: ReduxState) => state.groups.lenghtTextArea
export const selectInputTitileGroup = (state: ReduxState) => state.groups.titilegroup
export const selectInputTextMessage = (state: ReduxState) => state.groups.textmessage